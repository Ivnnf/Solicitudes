using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Necesidades02.Server.Models;

public partial class Usuario
{
    [Column("Id_Usuario")]
    public int IdUsuario { get; set; }
    [Column("Id_Tipo_Usuario")]
    public int IdTipoUsuario { get; set; }
    [Column("Id_Departamento")]
    public int IdDepartamento { get; set; }
    [Column("Nombre_Completo")]
    public string NombreCompleto { get; set; } = null!;
    [Column("Nombre_Usuario")]
    public string NombreUsuario { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? Telefono { get; set; }

    public string Contrasena { get; set; } = null!;

    [ForeignKey(nameof(IdTipoUsuario))]
    public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();


}
