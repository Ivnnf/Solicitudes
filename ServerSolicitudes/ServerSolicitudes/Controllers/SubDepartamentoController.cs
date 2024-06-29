using Microsoft.AspNetCore.Mvc;
using ServerSolicitudes.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace ServerSolicitudes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubDepartamentoController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        public SubDepartamentoController(NecesidadesContext context)
        {
            _context = context;
        }

        // GET: api/subdepartamento/{idDepartamento}
        [HttpGet("{idDepartamento}")]
        public async Task<IActionResult> GetSubDepartamentosByDepartamento(int idDepartamento)
        {
            var subDepartamentos = await _context.SubDepartamentos
                .Where(sd => sd.IdDepartamento == idDepartamento)
                .ToListAsync();

            // No retornes NotFound, simplemente retorna una lista vacía si no hay subdepartamentos
            return Ok(subDepartamentos);
        }
    }

}