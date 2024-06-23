

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes.Models;

public partial class EquipamientoEspecifico
{
    [Column("Id_Equip_Espec")]
    public int IdEquipEspec { get; set; }
    [Column("Id_Especificacion")]
    public int IdEspecificacion { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual Especificacion IdEspecificacionNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
}
