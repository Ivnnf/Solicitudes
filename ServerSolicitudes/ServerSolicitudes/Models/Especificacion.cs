using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;



namespace ServerSolicitudes.Models;

public partial class Especificacion
{
    [Column("Id_Especificacion")]
    public int IdEspecificacion { get; set; }

    [Column("Id_Tipo_Solicitud")]
    public int IdTipoSolicitud { get; set; }

    public string Glosa { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<EquipamientoEspecifico> EquipamientoEspecificos { get; set; } = new List<EquipamientoEspecifico>();

    public virtual TipoSolicitud IdTipoSolicitudNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
