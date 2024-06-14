using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerSolicitudes.Models;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipamientoEspecificoController : ControllerBase
    {
        private readonly NecesidadesContext _context;
        // El constructor inyecta el contexto de la base de datos
        public EquipamientoEspecificoController(NecesidadesContext context)
        {
            _context = context;
        }

        // Este método maneja las solicitudes GET a api/usuario/{id}
        [HttpGet("equ/{id}")]
        public async Task<IActionResult> getEspecificacionByTipoSolicitudId(int id)
        {
            var especificacion = await _context.Especificacions
                .Where(s => s.IdTipoSolicitud == id)
                .ToListAsync();
            if (especificacion == null)
            {
                return NotFound();
            }
            return Ok(especificacion);
        }

    }


}
