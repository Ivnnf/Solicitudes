using System;
using System.Collections.Generic;

namespace Necesidades02.Server.Models;

public partial class TipoSolicitud
{
    public int IdTipoSolicitud { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual ICollection<Especificacion> Especificacions { get; set; } = new List<Especificacion>();

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
