using Microsoft.AspNetCore.Mvc;
using ServerSolicitudes.Models; // Asegúrate de usar el namespace correcto de tu DbContext
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Necesidades02.Server.Models;

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
    }
}
