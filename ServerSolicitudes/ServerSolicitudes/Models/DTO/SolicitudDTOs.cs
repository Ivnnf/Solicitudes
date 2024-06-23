namespace ServerSolicitudes.Models.DTO
{
    public class SolicitudDTOs
    {
        public int IdSolicitud { get; set; }
        public int IdTipoSolicitud { get; set; }
        public string TipoSolicitudNombre { get; set; } = string.Empty;
        public int IdEspecificacion { get; set; }
        public string EspecificacionNombre { get; set; } = string.Empty;
        public int? IdEquipEspec { get; set; }
        public string EquipamientoEspecificoNombre { get; set; } = string.Empty;
        public int Cantidad { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public DateTime Fecha { get; set; }
        public string NombreSolicitante { get; set; } = string.Empty;
        public int? IdUsuario { get; set; }
        public string UsuarioCorreo { get; set; } = string.Empty;
        public int? IdUnidadPrincipal { get; set; }
        public string UnidadPrincipalNombre { get; set; } = string.Empty;
        public int? IdDepartamento { get; set; }
        public string DepartamentoNombre { get; set; } = string.Empty;
        public int? IdSubDepartamento { get; set; }
        public string SubDepartamentoNombre { get; set; } = string.Empty;
        public int IdEstado { get; set; }
        public string EstadoNombre { get; set; } = string.Empty;
    }
}
