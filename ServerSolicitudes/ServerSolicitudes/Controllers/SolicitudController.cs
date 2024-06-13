using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerSolicitudes.Models;
using System.Collections;
using ServerSolicitudes.Models.SolicituDTO;

namespace ServerSolicitudes.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        public SolicitudController(NecesidadesContext context)
        {
            _context = context;
        }
        //GET
        [HttpGet("usuario/{userId}")]
        public async Task<IActionResult> GetSolicitudesByUsuario(int userId)
        {
            var solicitudes = await _context.Solicitudes
                .Include(s => s.IdTipoSolicitudNavigation)
                .Include(s => s.IdEspecificacionNavigation)
                .Include(s => s.IdEquipEspecNavigation)
                .Where(s => s.IdUsuario == userId)
                .Select(s => new SolicitudDTOs
                {
                    IdSolicitud = s.IdSolicitud,
                    IdTipoSolicitud = s.IdTipoSolicitud,
                    TipoSolicitudNombre = s.IdTipoSolicitudNavigation.Glosa,
                    IdEspecificacion = s.IdEspecificacion,
                    EspecificacionNombre = s.IdEspecificacionNavigation.Glosa,
                    IdEquipEspec = s.IdEquipEspec,
                    EquipamientoEspecificoNombre = s.IdEquipEspecNavigation.Glosa,
                    Cantidad = s.Cantidad,
                    Descripcion = s.Descripcion,
                    Fecha = s.Fecha
                })
                .ToListAsync();

            return Ok(solicitudes);
        }





        //POST
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Solicitud request)
        {
            await _context.Solicitudes.AddAsync(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }



        //PUT
        [HttpPut]
        [Route("Editar/{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] SolicitudDTOs solicitudDTO)
        {
            var solicitud = await _context.Solicitudes.FindAsync(id);

            if (solicitud == null)
            {
                return NotFound();
            }

            // Actualizar propiedades
            solicitud.IdTipoSolicitud = solicitudDTO.IdTipoSolicitud;
            solicitud.IdEspecificacion = solicitudDTO.IdEspecificacion;
            solicitud.IdEquipEspec = solicitudDTO.IdEquipEspec;
            solicitud.Cantidad = solicitudDTO.Cantidad;
            solicitud.Descripcion = solicitudDTO.Descripcion;
            solicitud.Fecha = solicitudDTO.Fecha;

            // Actualizar en la base de datos
            _context.Solicitudes.Update(solicitud);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Solicitud actualizada con éxito." });
        }



        //DELETE
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Solicitud solicitud = await _context.Solicitudes.FindAsync(id);

            if (solicitud == null)
            {
                return NotFound();
            }

            _context.Solicitudes.Remove(solicitud);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        /*
        // GET: api/Solicitud
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solicitud>>> GetSolicitudes()
        {
            return await _context.Solicitudes
                                 .Include(s => s.IdEquipEspecNavigation)
                                 .Include(s => s.IdEspecificacionNavigation)
                                 .Include(s => s.IdTipoSolicitudNavigation)
                                 .ToListAsync();
        }

        // GET: api/Solicitud/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Solicitud>> GetSolicitud(int id)
        {
            var solicitud = await _context.Solicitudes
                                          .Include(s => s.IdEquipEspecNavigation)
                                          .Include(s => s.IdEspecificacionNavigation)
                                          .Include(s => s.IdTipoSolicitudNavigation)
                                          .FirstOrDefaultAsync(s => s.IdSolicitud == id);

            if (solicitud == null)
            {
                return NotFound();
            }

            return solicitud;
        }

        // POST: api/Solicitud
        [HttpPost]
        public async Task<ActionResult<Solicitud>> PostSolicitud(Solicitud solicitud)
        {
            _context.Solicitudes.Add(solicitud);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSolicitud), new { id = solicitud.IdSolicitud }, solicitud);
        }

        // PUT: api/Solicitud/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitud(int id, Solicitud solicitud)
        {
            if (id != solicitud.IdSolicitud)
            {
                return BadRequest();
            }

            _context.Entry(solicitud).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolicitudExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Solicitud/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitud(int id)
        {
            var solicitud = await _context.Solicitudes.FindAsync(id);
            if (solicitud == null)
            {
                return NotFound();
            }

            _context.Solicitudes.Remove(solicitud);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SolicitudExists(int id)
        {
            return _context.Solicitudes.Any(e => e.IdSolicitud == id);
        }*/
    }
}
