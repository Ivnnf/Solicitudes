using Microsoft.AspNetCore.Mvc;
using ServerSolicitudes.Models; // Cambia a la ruta correcta de tu modelo y DbContext
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Necesidades02.Server.Models;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoSolicitudController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        // Constructor que inyecta el contexto de la base de datos
        public TipoSolicitudController(NecesidadesContext context)
        {
            _context = context;
        }

        // GET: api/tipoSolicitud
        [HttpGet]
        public async Task<IActionResult> GetTipoSolicitudes()
        {
            var tipoSolicitudes = await _context.TipoSolicitudes.ToListAsync();
            return Ok(tipoSolicitudes);
        }
    }
}
