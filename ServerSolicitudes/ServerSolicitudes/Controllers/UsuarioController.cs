using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerSolicitudes.Models;
using ServerSolicitudes.Models.DTO;
using ServerSolicitudes.Models.UsuarioDTO;
using System.Linq;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(int id)
        {
            try
            {
                var userDto = await _context.Usuarios
                    .Where(s => s.IdUsuario == id)
                    .Select(s => new UsuarioDTO
                    {
                        IdUsuario = s.IdUsuario,
                        NombreCompleto = s.NombreCompleto,
                        NombreUsuario = s.NombreUsuario,
                        Correo = s.Correo,
                        IdTipoUsuario = s.IdTipoUsuario,
                        TipoUsuarioNombre = s.IdTipoUsuarioNavigation.Glosa
                    })
                    .ToListAsync();

                if (userDto.Count==0)
                {
                    return NotFound();
                }



                return Ok(userDto[0]);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return StatusCode(500, "Internal server error");
            }
        }




    }
}
