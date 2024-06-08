using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Necesidades02.Server.Models;

public partial class Solicitud
{
    [Column("Id_Solicitud")]
    public int IdSolicitud { get; set; }
    [Column("Id_Tipo_Solicitud")]
    public int IdTipoSolicitud { get; set; }
    [Column("Id_Especificacion")]
    public int IdEspecificacion { get; set; }
    [Column("Id_Equip_Espec")]
    public int IdEquipEspec { get; set; }
    [Column("Id_Usuario")]
    public int IdUsuario { get; set; }

    public int Cantidad { get; set; }

    public string? Descripcion { get; set; }

    [Column("Comentarios_Adicionales")]
    public string? ComentariosAdicionales { get; set; }

    public DateTime Fecha { get; set; }

    public virtual EquipamientoEspecifico IdEquipEspecNavigation { get; set; } = null!;

    public virtual Especificacion IdEspecificacionNavigation { get; set; } = null!;

    public virtual TipoSolicitud IdTipoSolicitudNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;

    public static List<Solicitud> GetSolicitudesPorTipo(int idTipoSolicitud, NecesidadesContext dbContext)
    {
        // Consulta las solicitudes que coincidan con el IdTipoSolicitud proporcionado
        var solicitudes = dbContext.Solicitudes
            .Where(s => s.IdTipoSolicitud == idTipoSolicitud)
            .ToList();

        return solicitudes;
    }


}
