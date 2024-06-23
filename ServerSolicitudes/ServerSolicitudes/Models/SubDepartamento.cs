using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models
{
    public partial class SubDepartamento
    {
        [Key]
        public int IdSubDepartamento { get; set; }

        public int IdDepartamento { get; set; }

        [StringLength(100)]
        public string Glosa { get; set; } = string.Empty;

        [ForeignKey(nameof(IdDepartamento))]
        public virtual Departamento? DepartamentoNavigation { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
        public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
    }
}
