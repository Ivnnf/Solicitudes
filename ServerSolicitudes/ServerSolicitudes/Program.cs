using Microsoft.EntityFrameworkCore;
using ServerSolicitudes.Models;
using Necesidades02.Server.Models;
using ServerSolicitudes.Controllers;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;






// <snippet_DI>
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowAnyHeader();
    });
});


builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));;
builder.Services.AddDbContext<NecesidadesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

app.UseCors("AllowAll");
// </snippet_DI>

// <snippet_get>
app.MapGet("/todoitems", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapPost("/todoitems/[]", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapGet("/solicitudes", async (NecesidadesContext necesidadesContext) =>
    await necesidadesContext.Solicitudes.ToListAsync());

app.MapGet("/departamentos/{id}", async(int id, NecesidadesContext db) =>
    await db.Departamentos.FindAsync(id)
        is Departamento depto
            ? Results.Ok(depto)
            : Results.NotFound());



app.MapGet("/solicitudesByType/{idTipoSolicitud}", async (int idTipoSolicitud, NecesidadesContext dbContext) =>
{
    var solicitudes = Solicitud.GetSolicitudesPorTipo(idTipoSolicitud, dbContext);

    // Escribir la respuesta en el cuerpo de la respuesta HTTP
    return solicitudes.ToList();
});




app.MapPut("/solicitudes/{id}", async (int id, Solicitud inputSolicitud, NecesidadesContext db) =>
{
    var todo = await db.Solicitudes.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Cantidad = inputSolicitud.Cantidad;

    await db.SaveChangesAsync();

    return Results.Accepted();
});

app.MapPost("/solicitudes", async (Solicitud solicitud, NecesidadesContext db) =>
{
    db.Solicitudes.Add(solicitud);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{solicitud.IdSolicitud}", solicitud);
});



/*app.MapGet("/usuarios/{id}", async (int id, NecesidadesContext db) =>
    await db.Usuarios.FindAsync(id)
        is Usuario user
            ? Results.Ok(user)
            : Results.NotFound());*/

/*
app.MapGet("/tipoSolicitud", async (NecesidadesContext necesidadesContext) =>
    await necesidadesContext.TipoSolicitudes.ToListAsync());*/
/*
app.MapGet("/departamentos", async (NecesidadesContext db) =>
    await db.Departamentos.ToListAsync());
    */




app.MapGet("/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

// <snippet_getCustom>
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());
// </snippet_getCustom>
// </snippet_get>

// <snippet_post>
app.MapPost("/todoitems", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});
// </snippet_post>

// <snippet_put>
app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});
// </snippet_put>

// <snippet_delete>
app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});
// </snippet_delete>




app.MapControllers();


app.Run();

