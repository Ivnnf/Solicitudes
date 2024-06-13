using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudeController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetSolicitudes()
        {
            // Lógica para obtener las solicitudes
            // Por ejemplo, aquí podrías retornar una lista de solicitudes
            var data = new { nombre = "00" };
            return Ok(data);
        }
    }
}
