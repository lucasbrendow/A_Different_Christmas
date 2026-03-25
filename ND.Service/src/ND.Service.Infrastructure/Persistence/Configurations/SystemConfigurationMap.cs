using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ND.Service.Domain.Entities;

namespace ND.Service.Infrastructure.Persistence.Configurations;

public sealed class SystemConfigurationMap : IEntityTypeConfiguration<SystemConfiguration>
{
    public void Configure(EntityTypeBuilder<SystemConfiguration> builder)
    {
        builder.ToTable("SystemConfigurations");

        builder.HasKey(configuration => configuration.Id);

        builder.Property(configuration => configuration.Id)
            .ValueGeneratedNever();

        builder.Property(configuration => configuration.DefaultLanguage)
            .HasConversion<string>()
            .HasMaxLength(32)
            .IsRequired();

        builder.Property(configuration => configuration.VisualTheme)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(configuration => configuration.IsActive)
            .IsRequired();

        builder.Property(configuration => configuration.CreatedOnUtc)
            .IsRequired();

        builder.Property(configuration => configuration.ModifiedOnUtc);
    }
}