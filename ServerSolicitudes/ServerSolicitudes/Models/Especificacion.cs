using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Necesidades02.Server.Models;

public partial class Especificacion
{
    [Column("Id_Especificacion")]
    public int IdEspecificacion { get; set; }

    [Column("Id_Tipo_Solicitud")]
    public int IdTipoSolicitud { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual ICollection<EquipamientoEspecifico> EquipamientoEspecificos { get; set; } = new List<EquipamientoEspecifico>();

    public virtual TipoSolicitud IdTipoSolicitudNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
