using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models
{
    public partial class Usuario
    {
        [Key]
        [Column("IdUsuario")]
        public int IdUsuario { get; set; }

        [Column("Id_Tipo_Usuario")]
        public int IdTipoUsuario { get; set; }

        [Column("Nombre_Completo")]
        [StringLength(100)]
        public string NombreCompleto { get; set; } = string.Empty;

        [Column("Nombre_Usuario")]
        [StringLength(100)]
        public string NombreUsuario { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Correo { get; set; }

        // Relación con TipoUsuario
        [ForeignKey(nameof(IdTipoUsuario))]
        [InverseProperty(nameof(TipoUsuario.Usuarios))]
        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; } = null!;

        public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
    }
}
