using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models;

public partial class TipoSolicitud
{
    [Column("Id_Tipo_Solicitud")]
    public int IdTipoSolicitud { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual ICollection<Especificacion> Especificacions { get; set; } = new List<Especificacion>();

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
