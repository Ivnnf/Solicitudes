using Microsoft.AspNetCore.Mvc;
using Necesidades02.Server.Models;
using ServerSolicitudes.Models;
using System.Threading.Tasks;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        // El constructor inyecta el contexto de la base de datos
        public UsuarioController(NecesidadesContext context)
        {
            _context = context;
        }

        // Este método maneja las solicitudes GET a api/usuario/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(int id)
        {
            var user = await _context.Usuarios.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


    }
}
