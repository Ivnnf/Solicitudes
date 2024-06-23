using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models
{
    public partial class Estado
    {
        [Key]
        [Column("IdEstado")]
        public int IdEstado { get; set; }

        [Column("NombreEstado")]
        [StringLength(50)]
        public string NombreEstado { get; set; } = null!;

        [Column("PermiteModificaciones")]
        public bool PermiteModificaciones { get; set; }

        // Propiedad de navegación para solicitudes que tienen este estado
        public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
    }
}
