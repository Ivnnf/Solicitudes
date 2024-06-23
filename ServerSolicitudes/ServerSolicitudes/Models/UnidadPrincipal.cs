using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models
{
    public partial class UnidadPrincipal
    {
        [Key]
        public int IdUnidadPrincipal { get; set; }

        [StringLength(100)]
        public string Glosa { get; set; } = string.Empty;

        public virtual ICollection<Departamento> Departamentos { get; set; } = new List<Departamento>();
        public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
        public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
    }
}
