using System;
using System.Collections.Generic;

namespace Necesidades02.Server.Models;

public partial class TipoUsuario
{
    public int IdTipoUsuario { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
