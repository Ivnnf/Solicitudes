using Microsoft.OpenApi.Any;
using ServerSolicitudes.Models.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ServerSolicitudes.Models
{
    public partial class Solicitud
    {
        [Key]
        [Column("Id_Solicitud")]
        public int IdSolicitud { get; set; }

        [Column("Id_Tipo_Solicitud")]
        public int IdTipoSolicitud { get; set; }

        [Column("Id_Especificacion")]
        public int IdEspecificacion { get; set; }

        [Column("Id_Equip_Espec")]
        public int? IdEquipEspec { get; set; }

        [Column("Id_Usuario")]
        public int? IdUsuario { get; set; }

        public int Cantidad { get; set; }

        [Column("Descripcion")]
        [StringLength(255)]
        public string? Descripcion { get; set; }

        public DateTime Fecha { get; set; }

        [Column("Nombre_Solicitante")]
        [StringLength(100)]
        public string NombreSolicitante { get; set; } = null!;

        public int? IdUnidadPrincipal { get; set; }

        public int? IdDepartamento { get; set; }

        public int? IdSubDepartamento { get; set; }

        public int IdEstado { get; set; }

        [ForeignKey(nameof(IdTipoSolicitud))]
        [InverseProperty(nameof(TipoSolicitud.Solicitudes))]
        public virtual TipoSolicitud? IdTipoSolicitudNavigation { get; set; }

        [ForeignKey(nameof(IdEspecificacion))]
        [InverseProperty(nameof(Especificacion.Solicitudes))]
        public virtual Especificacion? IdEspecificacionNavigation { get; set; }

        [ForeignKey(nameof(IdEquipEspec))]
        [InverseProperty(nameof(EquipamientoEspecifico.Solicitudes))]
        public virtual EquipamientoEspecifico? IdEquipEspecNavigation { get; set; }

        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Solicitudes))]
        public virtual Usuario? IdUsuarioNavigation { get; set; }

        [ForeignKey(nameof(IdUnidadPrincipal))]
        [InverseProperty(nameof(UnidadPrincipal.Solicitudes))]
        public virtual UnidadPrincipal? IdUnidadPrincipalNavigation { get; set; }

        [ForeignKey(nameof(IdDepartamento))]
        [InverseProperty(nameof(Departamento.Solicitudes))]
        public virtual Departamento? IdDepartamentoNavigation { get; set; }

        [ForeignKey(nameof(IdSubDepartamento))]
        [InverseProperty(nameof(SubDepartamento.Solicitudes))]
        public virtual SubDepartamento? IdSubDepartamentoNavigation { get; set; }

        [ForeignKey(nameof(IdEstado))]
        [InverseProperty(nameof(Estado.Solicitudes))]
        public virtual Estado? IdEstadoNavigation { get; set; }

        public static List<Solicitud> GetSolicitudesPorTipo(int idTipoSolicitud, NecesidadesContext dbContext)
        {
            return dbContext.Solicitudes
                .Where(s => s.IdTipoSolicitud == idTipoSolicitud)
                .ToList();
        }
    }
}
