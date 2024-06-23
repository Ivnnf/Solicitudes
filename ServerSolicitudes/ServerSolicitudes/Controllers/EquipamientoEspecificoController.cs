using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerSolicitudes.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerSolicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipamientoEspecificoController : ControllerBase
    {
        private readonly NecesidadesContext _context;

        public EquipamientoEspecificoController(NecesidadesContext context)
        {
            _context = context;
        }
        
        // GET: api/EquipamientoEspecifico/espec/{id}
            [HttpGet("espec/{id}")]
            public async Task<IActionResult> GetEquipamientoEspecificoByEspecificacionId(int id)
        {
            var equipamientosEspecificos = await _context.EquipamientoEspecificos
                .Where(e => e.IdEspecificacion == id)
                .Include(e => e.IdEspecificacionNavigation) // Incluye la relación si es necesario
                .ToListAsync();

            if (equipamientosEspecificos == null || equipamientosEspecificos.Count == 0)
            {
                return NotFound();
            }

            return Ok(equipamientosEspecificos);
        }


        // POST: api/EquipamientoEspecifico
        [HttpPost]
        public async Task<ActionResult<EquipamientoEspecifico>> PostEquipamientoEspecifico(EquipamientoEspecifico equipamientoEspecifico)
        {
            _context.EquipamientoEspecificos.Add(equipamientoEspecifico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEquipamientoEspecificoByEspecificacionId), new { id = equipamientoEspecifico.IdEquipEspec }, equipamientoEspecifico);
        }

        // PUT: api/EquipamientoEspecifico/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipamientoEspecifico(int id, EquipamientoEspecifico equipamientoEspecifico)
        {
            if (id != equipamientoEspecifico.IdEquipEspec)
            {
                return BadRequest();
            }

            _context.Entry(equipamientoEspecifico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipamientoEspecificoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/EquipamientoEspecifico/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipamientoEspecifico(int id)
        {
            var equipamientoEspecifico = await _context.EquipamientoEspecificos.FindAsync(id);
            if (equipamientoEspecifico == null)
            {
                return NotFound();
            }

            _context.EquipamientoEspecificos.Remove(equipamientoEspecifico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EquipamientoEspecificoExists(int id)
        {
            return _context.EquipamientoEspecificos.Any(e => e.IdEquipEspec == id);
        }
    }
}
