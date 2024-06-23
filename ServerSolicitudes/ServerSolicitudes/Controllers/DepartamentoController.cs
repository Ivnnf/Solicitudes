using Microsoft.AspNetCore.Mvc;
using ServerSolicitudes.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        public DepartamentoController(NecesidadesContext context)
        {
            _context = context;
        }

        // GET: api/departamento
        [HttpGet]
        public async Task<IActionResult> GetDepartamentos()
        {
            var departamentos = await _context.Departamentos.ToListAsync();
            return Ok(departamentos);
        }

        // GET: api/departamento/unidad/{idUnidadPrincipal}
        [HttpGet("unidad/{idUnidadPrincipal}")]
        public async Task<IActionResult> GetDepartamentosByUnidad(int idUnidadPrincipal)
        {
            var departamentos = await _context.Departamentos
                .Where(d => d.IdUnidadPrincipal == idUnidadPrincipal)
                .ToListAsync();

            if (departamentos == null || !departamentos.Any())
            {
                return NotFound($"No se encontraron departamentos para la unidad principal con ID {idUnidadPrincipal}.");
            }

            return Ok(departamentos);
        }
    }
}
