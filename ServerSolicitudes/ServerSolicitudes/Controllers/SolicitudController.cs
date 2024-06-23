using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerSolicitudes.Models;
using ServerSolicitudes.Models.DTO;

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
        public async Task<IActionResult> Guardar([FromBody] Solicitud request)
        {
            if (request == null || !ModelState.IsValid)
            {
                return BadRequest("Datos inválidos.");
            }

            if (request.IdTipoSolicitud == 0 ||
                request.IdEspecificacion == 0 ||
                request.IdUsuario == 0 ||
                request.Cantidad <= 0 ||
                string.IsNullOrEmpty(request.Descripcion))
            {
                return BadRequest("Faltan datos o son inválidos.");
            }

            try
            {
                await _context.Solicitudes.AddAsync(request);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Solicitud guardada con éxito." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al guardar la solicitud: {ex.Message}");
            }
        }


        // PUT: api/solicitud/editar/{id}
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] SolicitudDTOs solicitudDTO)
        {
            var solicitud = await _context.Solicitudes
                .Include(s => s.IdUsuarioNavigation)
                .FirstOrDefaultAsync(s => s.IdSolicitud == id);

            if (solicitud == null)
            {
                return NotFound("Solicitud no encontrada.");
            }

            solicitud.IdTipoSolicitud = solicitudDTO.IdTipoSolicitud;
            solicitud.IdEspecificacion = solicitudDTO.IdEspecificacion;
            solicitud.IdEquipEspec = solicitudDTO.IdEquipEspec;
            solicitud.Cantidad = solicitudDTO.Cantidad;
            solicitud.Descripcion = solicitudDTO.Descripcion;
            solicitud.Fecha = solicitudDTO.Fecha;
            solicitud.NombreSolicitante = solicitudDTO.NombreSolicitante;
            solicitud.IdUnidadPrincipal = solicitudDTO.IdUnidadPrincipal;
            solicitud.IdDepartamento = solicitudDTO.IdDepartamento;
            solicitud.IdSubDepartamento = solicitudDTO.IdSubDepartamento;
            solicitud.IdEstado = solicitudDTO.IdEstado;

            _context.Solicitudes.Update(solicitud);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Solicitud actualizada con éxito." });
        }


        // DELETE: api/solicitud/eliminar/{id}
        [HttpDelete("eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var solicitud = await _context.Solicitudes
                .FirstOrDefaultAsync(s => s.IdSolicitud == id);

            if (solicitud == null)
            {
                return NotFound("Solicitud no encontrada.");
            }

            _context.Solicitudes.Remove(solicitud);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Solicitud eliminada con éxito." });
        }

    }
}
