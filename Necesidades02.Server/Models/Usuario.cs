using System;
using System.Collections.Generic;

namespace Necesidades02.Server.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public int IdTipoUsuario { get; set; }

    public string NombreCompleto { get; set; } = null!;

    public string NombreUsuario { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? Telefono { get; set; }

    public string? Departamento { get; set; }

    public string Contraseña { get; set; } = null!;

    public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
