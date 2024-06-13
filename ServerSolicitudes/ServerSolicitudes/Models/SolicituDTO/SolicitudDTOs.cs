namespace ServerSolicitudes.Models.SolicituDTO
{
    public class SolicitudDTOs
    {
        public int IdSolicitud { get; set; }  // Representa Id_Solicitud
        public int IdTipoSolicitud { get; set; }  // Representa Id_Tipo_Solicitud
        public string TipoSolicitudNombre { get; set; }  // Nombre o descripción del tipo de solicitud
        public int IdEspecificacion { get; set; }  // Representa Id_Especificacion
        public string EspecificacionNombre { get; set; }  // Nombre o descripción de la especificación
        public int IdEquipEspec { get; set; }  // Representa Id_Equip_Espec
        public string EquipamientoEspecificoNombre { get; set; }  // Nombre o descripción del equipamiento específico
        public int Cantidad { get; set; }  // Representa la cantidad solicitada
        public string Descripcion { get; set; }  // Descripción de la solicitud
        public DateTime Fecha { get; set; }  // Fecha de la solicitud
    }

}
