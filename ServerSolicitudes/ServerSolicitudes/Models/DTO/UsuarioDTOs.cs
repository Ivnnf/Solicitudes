namespace ServerSolicitudes.Models.UsuarioDTO
{
    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        public string NombreCompleto { get; set; } = string.Empty;
        public string NombreUsuario { get; set; } = string.Empty;
        public string? Correo { get; set; } = string.Empty;  
        public int IdTipoUsuario { get; set; }
        public string TipoUsuarioNombre { get; set; } = string.Empty; 
    }
}
