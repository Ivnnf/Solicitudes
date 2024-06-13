using Microsoft.EntityFrameworkCore;





namespace ServerSolicitudes.Models
{


    public partial class NecesidadesContext : DbContext
    {
        public NecesidadesContext(DbContextOptions<NecesidadesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TipoSolicitud> TipoSolicitudes { get; set; }
        // Asegúrate de agregar DbSet para otras entidades también, como Especificacion, Usuario, etc.
        public virtual DbSet<Especificacion> Especificacions { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Solicitud> Solicitudes { get; set; }
        public virtual DbSet<EquipamientoEspecifico> EquipamientoEspecificos { get; set; }
        public virtual DbSet<Departamento> Departamentos { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.HasKey(e => e.IdDepartamento).HasName("PK__DEPARTAM__D9F8A911A0ECF3BC");

                entity.ToTable("DEPARTAMENTO");

                entity.Property(e => e.IdDepartamento).HasColumnName("Id_Departamento");
                entity.Property(e => e.Glosa)
                    .HasMaxLength(50)
                    .HasColumnName("GLOSA");
            });
            modelBuilder.Entity<TipoSolicitud>(entity =>
            {
                entity.HasKey(e => e.IdTipoSolicitud);

                entity.Property(e => e.Glosa)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            // Configura otras entidades también
            modelBuilder.Entity<Especificacion>(entity =>
            {
                entity.HasKey(e => e.IdEspecificacion);

                entity.Property(e => e.Glosa)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdTipoSolicitudNavigation)
                    .WithMany(p => p.Especificacions)
                    .HasForeignKey(d => d.IdTipoSolicitud)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            modelBuilder.Entity<Usuario>().ToTable("Usuario");
            modelBuilder.Entity<TipoUsuario>().ToTable("Tipo_Usuario");
            modelBuilder.Entity<Especificacion>().ToTable("Especificacion");
            modelBuilder.Entity<Solicitud>().ToTable("Solicitud");
            modelBuilder.Entity<TipoSolicitud>().ToTable("TipoSolicitud");

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.NombreCompleto)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.NombreUsuario)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Contrasena)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.IdDepartamento)
                    .HasColumnName("Id_departamento");

            });


            modelBuilder.Entity<Usuario>().HasKey(u => u.IdUsuario);
            modelBuilder.Entity<TipoUsuario>().HasKey(t => t.IdTipoUsuario);


            modelBuilder.Entity<Solicitud>(entity =>
            {
                entity.HasKey(e => e.IdSolicitud);

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(250);


                entity.HasOne(d => d.IdTipoSolicitudNavigation)
                    .WithMany(p => p.Solicituds)
                    .HasForeignKey(d => d.IdTipoSolicitud)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdEspecificacionNavigation)
                    .WithMany(p => p.Solicituds)
                    .HasForeignKey(d => d.IdEspecificacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdEquipEspecNavigation)
                    .WithMany(p => p.Solicituds)
                    .HasForeignKey(d => d.IdEquipEspec)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Solicitudes)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                
            });

            modelBuilder.Entity<EquipamientoEspecifico>(entity =>
            {
                entity.ToTable("EquipamientoEspecifico");

                entity.HasKey(e => e.IdEquipEspec);

                entity.Property(e => e.Glosa)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdEspecificacionNavigation)
                    .WithMany(p => p.EquipamientoEspecificos)
                    .HasForeignKey(d => d.IdEspecificacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }

        private static int GetIdTipoUsuario(Usuario u)
        {
            return u.IdTipoUsuario;
        }
    }
}
