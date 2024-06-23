using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerSolicitudes.Models;
using System.Threading.Tasks;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecificacionController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        // El constructor inyecta el contexto de la base de datos
        public EspecificacionController(NecesidadesContext context)
        {
            _context = context;
        }

        // Este método maneja las solicitudes GET a api/usuario/{id}
        [HttpGet("sol/{id}")]
        public async Task<IActionResult> getEspecificacionByTipoSolicitudId(int id)
        {
            var especificaciones = await _context.Especificaciones
                .Where(e => e.IdTipoSolicitud == id)
                .ToListAsync();

            if (especificaciones == null || especificaciones.Count == 0)
            {
                return NotFound();
            }

            return Ok(especificaciones);
        }



    }
}
