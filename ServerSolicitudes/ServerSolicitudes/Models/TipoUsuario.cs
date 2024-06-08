using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Necesidades02.Server.Models;

public partial class TipoUsuario
{
    [Column("Id_Tipo_Usuario")]
    public int IdTipoUsuario { get; set; }

    public string Glosa { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
