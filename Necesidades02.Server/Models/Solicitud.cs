using System;
using System.Collections.Generic;

namespace Necesidades02.Server.Models;

public partial class Solicitud
{
    public int IdSolicitud { get; set; }

    public int IdTipoSolicitud { get; set; }

    public int IdEspecificacion { get; set; }

    public int IdEquipEspec { get; set; }

    public int IdUsuario { get; set; }

    public int Cantidad { get; set; }

    public string? Descripcion { get; set; }

    public string? ComentariosAdicionales { get; set; }

    public DateTime Fecha { get; set; }

    public virtual EquipamientoEspecifico IdEquipEspecNavigation { get; set; } = null!;

    public virtual Especificacion IdEspecificacionNavigation { get; set; } = null!;

    public virtual TipoSolicitud IdTipoSolicitudNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
