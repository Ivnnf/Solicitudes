using System;
using System.Collections.Generic;

namespace Necesidades02.Server.Models;

public partial class EquipamientoEspecifico
{
    public int IdEquipEspec { get; set; }

    public int IdEspecificacion { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual Especificacion IdEspecificacionNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
