using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Necesidades02.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Necesidades02.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoSolicitudController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        public TipoSolicitudController(NecesidadesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoSolicitud>>> GetTipoSolicitudes()
        {
            return await _context.TipoSolicitudes.ToListAsync();
        }
    }
}
