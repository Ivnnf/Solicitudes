using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models
{
    [Table("TipoUsuario")]
    public partial class TipoUsuario
    {
        [Key]
        [Column("Id_Tipo_Usuario")]
        public int IdTipoUsuario { get; set; }

        [Column("Glosa")]
        [StringLength(50)]
        public string Glosa { get; set; } = string.Empty;

        // Propiedad de navegación para relacionar con Usuarios
        public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
    }
}
