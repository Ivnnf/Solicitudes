﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerSolicitudes0.Server.Models;

public partial class Departamento
{
    [Column("Id_Departamento")]
    public int IdDepartamento { get; set; }

    public string Glosa { get; set; } = null!;
}