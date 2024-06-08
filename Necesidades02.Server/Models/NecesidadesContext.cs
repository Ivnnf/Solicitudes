using Microsoft.EntityFrameworkCore;

namespace Necesidades02.Server.Models
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

                entity.Property(e => e.Departamento)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Contraseña)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Solicitud>(entity =>
            {
                entity.HasKey(e => e.IdSolicitud);

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(250);

                entity.Property(e => e.ComentariosAdicionales)
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
                    .WithMany(p => p.Solicituds)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<EquipamientoEspecifico>(entity =>
            {
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
    }
}
