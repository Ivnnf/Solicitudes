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
        public virtual DbSet<Especificacion> Especificaciones { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Solicitud> Solicitudes { get; set; }
        public virtual DbSet<EquipamientoEspecifico> EquipamientoEspecificos { get; set; }
        public virtual DbSet<Departamento> Departamentos { get; set; }
        public virtual DbSet<SubDepartamento> SubDepartamentos { get; set; }
        public virtual DbSet<UnidadPrincipal> UnidadesPrincipales { get; set; }
        public virtual DbSet<Estado> Estados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().ToTable("Usuario");
            modelBuilder.Entity<TipoUsuario>().ToTable("TipoUsuario");
            modelBuilder.Entity<Especificacion>().ToTable("Especificacion");
            modelBuilder.Entity<Solicitud>().ToTable("Solicitud");
            modelBuilder.Entity<TipoSolicitud>().ToTable("TipoSolicitud");
            modelBuilder.Entity<UnidadPrincipal>().ToTable("UnidadPrincipal");
            modelBuilder.Entity<Departamento>().ToTable("Departamento");
            modelBuilder.Entity<SubDepartamento>().ToTable("SubDepartamento");
            modelBuilder.Entity<Estado>().ToTable("Estado");

            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.HasKey(e => e.IdDepartamento).HasName("PK_Departamento");

                entity.Property(e => e.IdDepartamento).HasColumnName("IdDepartamento");
                entity.Property(e => e.IdUnidadPrincipal).HasColumnName("IdUnidadPrincipal");
                entity.Property(e => e.Glosa).HasMaxLength(100).HasColumnName("Glosa");

                entity.HasOne(d => d.UnidadPrincipalNavigation)
                      .WithMany(up => up.Departamentos)
                      .HasForeignKey(d => d.IdUnidadPrincipal)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Departamento_UnidadPrincipal");
            });

            modelBuilder.Entity<SubDepartamento>(entity =>
            {
                entity.HasKey(e => e.IdSubDepartamento).HasName("PK_SubDepartamento");

                entity.Property(e => e.IdSubDepartamento).HasColumnName("IdSubDepartamento");
                entity.Property(e => e.IdDepartamento).HasColumnName("IdDepartamento");
                entity.Property(e => e.Glosa).HasMaxLength(100).HasColumnName("Glosa");

                entity.HasOne(sd => sd.DepartamentoNavigation)
                      .WithMany(d => d.SubDepartamentos)
                      .HasForeignKey(sd => sd.IdDepartamento)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_SubDepartamento_Departamento");
            });

            modelBuilder.Entity<UnidadPrincipal>(entity =>
            {
                entity.HasKey(e => e.IdUnidadPrincipal).HasName("PK_UnidadPrincipal");

                entity.Property(e => e.IdUnidadPrincipal).HasColumnName("IdUnidadPrincipal");
                entity.Property(e => e.Glosa).HasMaxLength(100).HasColumnName("Glosa");

                entity.HasMany(up => up.Departamentos)
                      .WithOne(d => d.UnidadPrincipalNavigation)
                      .HasForeignKey(d => d.IdUnidadPrincipal)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_UnidadPrincipal_Departamento");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario).HasName("PK_TipoUsuario");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("Id_Tipo_Usuario");
                entity.Property(e => e.Glosa).HasMaxLength(50).HasColumnName("Glosa");

                entity.ToTable("TipoUsuario");
            });


            modelBuilder.Entity<Especificacion>(entity =>
            {
                entity.HasKey(e => e.IdEspecificacion);

                entity.Property(e => e.Glosa).HasMaxLength(50);

                entity.HasOne(e => e.IdTipoSolicitudNavigation)
                      .WithMany(ts => ts.Especificaciones)
                      .HasForeignKey(e => e.IdTipoSolicitud)
                      .OnDelete(DeleteBehavior.ClientSetNull);
            });

            


            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.NombreCompleto).HasMaxLength(100).HasColumnName("Nombre_Completo");
                entity.Property(e => e.NombreUsuario).HasMaxLength(100).HasColumnName("Nombre_Usuario");
                entity.Property(e => e.Correo).HasMaxLength(100).HasColumnName("Correo");

                entity.HasOne(e => e.IdTipoUsuarioNavigation)
                      .WithMany(tu => tu.Usuarios)
                      .HasForeignKey(e => e.IdTipoUsuario)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Usuario_TipoUsuario");
            });


            modelBuilder.Entity<TipoSolicitud>(entity =>
            {
                entity.HasKey(e => e.IdTipoSolicitud).HasName("PK_TipoSolicitud");

                entity.Property(e => e.IdTipoSolicitud).HasColumnName("Id_Tipo_Solicitud");
                entity.Property(e => e.Glosa).HasMaxLength(50).HasColumnName("Glosa");

                entity.ToTable("TipoSolicitud");
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

            modelBuilder.Entity<Solicitud>(entity =>
            {
                entity.HasKey(e => e.IdSolicitud);

                entity.Property(e => e.NombreSolicitante).HasMaxLength(100).HasColumnName("Nombre_Solicitante");
                entity.Property(e => e.Descripcion).HasMaxLength(255).HasColumnName("Descripcion");

                entity.HasOne(e => e.IdTipoSolicitudNavigation)
                      .WithMany(ts => ts.Solicitudes)
                      .HasForeignKey(e => e.IdTipoSolicitud)
                      .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.IdEspecificacionNavigation)
                      .WithMany(es => es.Solicitudes)
                      .HasForeignKey(e => e.IdEspecificacion)
                      .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.IdEquipEspecNavigation)
                      .WithMany(ee => ee.Solicitudes)
                      .HasForeignKey(e => e.IdEquipEspec);

                entity.HasOne(e => e.IdUsuarioNavigation)
                      .WithMany(u => u.Solicitudes)
                      .HasForeignKey(e => e.IdUsuario);

                entity.HasOne(e => e.IdUnidadPrincipalNavigation)
                      .WithMany(up => up.Solicitudes)
                      .HasForeignKey(e => e.IdUnidadPrincipal);

                entity.HasOne(e => e.IdDepartamentoNavigation)
                      .WithMany(d => d.Solicitudes)
                      .HasForeignKey(e => e.IdDepartamento);

                entity.HasOne(e => e.IdSubDepartamentoNavigation)
                      .WithMany(sd => sd.Solicitudes)
                      .HasForeignKey(e => e.IdSubDepartamento);

                entity.HasOne(e => e.IdEstadoNavigation)
                      .WithMany(est => est.Solicitudes)
                      .HasForeignKey(e => e.IdEstado)
                      .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.HasKey(e => e.IdEstado);

                entity.Property(e => e.NombreEstado)
                      .HasMaxLength(100);

                entity.HasMany(e => e.Solicitudes)
                      .WithOne(s => s.IdEstadoNavigation)
                      .HasForeignKey(s => s.IdEstado)
                      .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }
    }
}
