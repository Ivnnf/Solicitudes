using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerSolicitudes.Models;
using ServerSolicitudes.Models.DTO;
using Microsoft.Extensions.Logging;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudController : ControllerBase
    

    {
        private readonly NecesidadesContext _context;
        private readonly ILogger<SolicitudController> _logger;

        public SolicitudController(NecesidadesContext context, ILogger<SolicitudController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/solicitud/usuario/{userId}
        [HttpGet("usuario/{userId}")]
        public async Task<IActionResult> GetSolicitudesByUsuario(int userId)
        {
            try
            {
                var solicitudesDTO = await _context.Solicitudes
                    .Where(s => s.IdUsuario == userId)
                    .Select(s => new SolicitudDTOs
                    {
                        IdSolicitud = s.IdSolicitud,
                        IdTipoSolicitud = s.IdTipoSolicitud,
                        TipoSolicitudNombre = s.IdTipoSolicitudNavigation != null ? s.IdTipoSolicitudNavigation.Glosa : string.Empty,
                        IdEspecificacion = s.IdEspecificacion,
                        EspecificacionNombre = s.IdEspecificacionNavigation != null ? s.IdEspecificacionNavigation.Glosa : string.Empty,
                        IdEquipEspec = s.IdEquipEspec,
                        EquipamientoEspecificoNombre = s.IdEquipEspecNavigation != null ? s.IdEquipEspecNavigation.Glosa : string.Empty,
                        Cantidad = s.Cantidad,
                        Descripcion = s.Descripcion ?? string.Empty,
                        Fecha = s.Fecha,
                        NombreSolicitante = s.NombreSolicitante,
                        IdUsuario = s.IdUsuario,
                        UsuarioCorreo = s.IdUsuarioNavigation != null ? s.IdUsuarioNavigation.Correo : string.Empty,
                        IdUnidadPrincipal = s.IdUnidadPrincipal,
                        UnidadPrincipalNombre = s.IdUnidadPrincipalNavigation != null ? s.IdUnidadPrincipalNavigation.Glosa : string.Empty,
                        IdDepartamento = s.IdDepartamento,
                        DepartamentoNombre = s.IdDepartamentoNavigation != null ? s.IdDepartamentoNavigation.Glosa : string.Empty,
                        IdSubDepartamento = s.IdSubDepartamento,
                        SubDepartamentoNombre = s.IdSubDepartamentoNavigation != null ? s.IdSubDepartamentoNavigation.Glosa : string.Empty,
                        IdEstado = s.IdEstado,
                        EstadoNombre = s.IdEstadoNavigation != null ? s.IdEstadoNavigation.NombreEstado : string.Empty
                    })
                    .ToListAsync();

                return Ok(solicitudesDTO);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return StatusCode(500, "Internal server error");
            }
        }


       
        // POST: api/solicitud/guardar
        [HttpPost("guardar")]
        public async Task<IActionResult> Guardar([FromBody] SolicitudDTOs solicitudDTO)
        {
            if (solicitudDTO == null || !ModelState.IsValid)
            {
                return BadRequest("Datos inválidos.");
            }

            // Log para verificar los datos recibidos
            Console.WriteLine($"Datos recibidos: {System.Text.Json.JsonSerializer.Serialize(solicitudDTO)}");

            // Validaciones básicas
            if (solicitudDTO.IdTipoSolicitud == 0 || solicitudDTO.IdUsuario == 0 || solicitudDTO.Cantidad <= 0 || string.IsNullOrEmpty(solicitudDTO.Descripcion))
            {
                return BadRequest("Faltan datos o son inválidos.");
            }

            try
            {
                // Crear el objeto Solicitud desde el DTO
                var solicitud = new Solicitud
                {
                    IdTipoSolicitud = solicitudDTO.IdTipoSolicitud,
                    IdEspecificacion = solicitudDTO.IdEspecificacion,
                    IdEquipEspec = solicitudDTO.IdEquipEspec,
                    IdUsuario = solicitudDTO.IdUsuario,
                    Cantidad = solicitudDTO.Cantidad,
                    Descripcion = solicitudDTO.Descripcion,
                    Fecha = solicitudDTO.Fecha != DateTime.MinValue ? solicitudDTO.Fecha : DateTime.UtcNow,
                    NombreSolicitante = solicitudDTO.NombreSolicitante,
                    IdUnidadPrincipal = solicitudDTO.IdUnidadPrincipal,
                    IdDepartamento = solicitudDTO.IdDepartamento,
                    IdSubDepartamento = solicitudDTO.IdSubDepartamento,
                    IdEstado = solicitudDTO.IdEstado
                };

                // Guardar la solicitud
                await _context.Solicitudes.AddAsync(solicitud);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Solicitud guardada con éxito." });
            }
            catch (Exception ex)
            {
                var innerExceptionMessage = ex.InnerException?.Message ?? ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al guardar la solicitud: {innerExceptionMessage}");
            }
        }




        // PUT: api/solicitud/editar/{id}
        [HttpPut("usuario/editar/{id}")]
        public async Task<IActionResult> EditarSolicitud(int id, [FromBody] SolicitudDTOs solicitudDTO)
        {
            if (solicitudDTO == null || id != solicitudDTO.IdSolicitud)
            {
                return BadRequest("Datos inválidos o IDs no coinciden.");
            }

            try
            {
                var solicitud = await _context.Solicitudes.FirstOrDefaultAsync(s => s.IdSolicitud == id);

                if (solicitud == null)
                {
                    return NotFound("Solicitud no encontrada.");
                }

                if (solicitud.IdEstado == 2)
                {
                    return BadRequest("No se puede editar una solicitud que ya ha sido enviada.");
                }

                // Actualizar el estado si es diferente y válido
                if (solicitudDTO.IdEstado != solicitud.IdEstado && solicitudDTO.IdEstado == 2)
                {
                    solicitud.IdEstado = solicitudDTO.IdEstado;
                }
                else
                {
                    // Actualizar los campos de la solicitud
                    solicitud.IdTipoSolicitud = solicitudDTO.IdTipoSolicitud;
                    solicitud.IdEspecificacion = solicitudDTO.IdEspecificacion;
                    solicitud.IdEquipEspec = solicitudDTO.IdEquipEspec;
                    solicitud.Cantidad = solicitudDTO.Cantidad;
                    solicitud.Descripcion = solicitudDTO.Descripcion ?? string.Empty;
                    solicitud.Fecha = solicitudDTO.Fecha;
                    solicitud.NombreSolicitante = solicitudDTO.NombreSolicitante ?? string.Empty;
                    solicitud.IdUsuario = solicitudDTO.IdUsuario;
                    solicitud.IdUnidadPrincipal = solicitudDTO.IdUnidadPrincipal;
                    solicitud.IdDepartamento = solicitudDTO.IdDepartamento;
                    solicitud.IdSubDepartamento = solicitudDTO.IdSubDepartamento;
                }

                _context.Solicitudes.Update(solicitud);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Solicitud actualizada con éxito." });
            }
            catch (Exception ex)
            {
                // Registrar la excepción
                _logger.LogError(ex, "Ocurrió un error al actualizar la solicitud.");
                return StatusCode(500, "Error interno del servidor");
            }
        }



        // PUT: api/solicitud/eliminar/{id}
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarSolicitud(int id)
        {
            try
            {
                var solicitud = await _context.Solicitudes.FindAsync(id);
                if (solicitud == null)
                {
                    return NotFound("Solicitud no encontrada.");
                }

                _context.Solicitudes.Remove(solicitud);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Solicitud eliminada con éxito." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocurrió un error al eliminar la solicitud con ID {id}.", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }




    }
}
