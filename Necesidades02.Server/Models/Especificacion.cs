using System;
using System.Collections.Generic;

namespace Necesidades02.Server.Models;

public partial class Especificacion
{
    public int IdEspecificacion { get; set; }

    public int IdTipoSolicitud { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual ICollection<EquipamientoEspecifico> EquipamientoEspecificos { get; set; } = new List<EquipamientoEspecifico>();

    public virtual TipoSolicitud IdTipoSolicitudNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
