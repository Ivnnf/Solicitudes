using Microsoft.AspNetCore.Mvc;
using ServerSolicitudes.Models; // Asegúrate de usar el namespace correcto de tu DbContext
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnidadPrincipalController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        public UnidadPrincipalController(NecesidadesContext context)
        {
            _context = context;
        }

        // GET: api/unidadprincipal
        [HttpGet]
        public async Task<IActionResult> GetUnidadesPrincipales()
        {
            var unidades = await _context.UnidadesPrincipales.ToListAsync();
            return Ok(unidades);
        }

        // GET: api/unidadprincipal/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUnidadPrincipal(int id)
        {
            var unidad = await _context.UnidadesPrincipales.FindAsync(id);

            if (unidad == null)
            {
                return NotFound();
            }

            return Ok(unidad);
        }
    }
}
