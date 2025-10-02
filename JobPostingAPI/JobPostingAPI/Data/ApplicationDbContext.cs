using Microsoft.EntityFrameworkCore;
using JobPostingAPI.Models;

namespace JobPostingAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Job> Jobs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Simplified configuration for in-memory database
            modelBuilder.Entity<Job>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Description)
                    .IsRequired();

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ClosingDate)
                    .IsRequired();

                entity.Property(e => e.Salary)
                    .HasMaxLength(100);

                entity.Property(e => e.Requirements);
            });
        }
    }
}