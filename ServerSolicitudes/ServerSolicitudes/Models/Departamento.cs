using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models
{
    public partial class Departamento
    {
        [Key]
        public int IdDepartamento { get; set; }
        public int? IdUnidadPrincipal { get; set; }

        [StringLength(100)]
        public string Glosa { get; set; } = string.Empty;

        [ForeignKey(nameof(IdUnidadPrincipal))]
        public virtual UnidadPrincipal UnidadPrincipalNavigation { get; set; } = null!;

        public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
        public virtual ICollection<SubDepartamento> SubDepartamentos { get; set; } = new List<SubDepartamento>();
        public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
    }
}
