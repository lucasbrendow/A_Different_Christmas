using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using ND.Service.Domain.Entities;
using ND.Service.Domain.Enums;
using ND.Service.Infrastructure.Persistence;
using System.Threading.Tasks;
using Xunit;

namespace ND.Service.UnitTests;

public sealed class ApplicationDbContextPersistenceTests
{
    [Fact]
    public async Task UnitOfWorkCommitTransactionAsync_ShouldPersistChanges()
    {
        await using var connection = await OpenConnectionAsync();
        await using var context = await CreateContextAsync(connection);
        await using var unitOfWork = new UnitOfWork(context);

        await unitOfWork.BeginTransactionAsync();

        context.SystemConfigurations.Add(new SystemConfiguration(ApplicationLanguage.English, "VelvetGold"));
        await unitOfWork.SaveChangesAsync();
        await unitOfWork.CommitTransactionAsync();

        await using var verificationContext = await CreateContextAsync(connection);
        var persistedCount = await verificationContext.SystemConfigurations.CountAsync();

        Assert.Equal(1, persistedCount);
    }

    [Fact]
    public async Task UnitOfWorkRollbackTransactionAsync_ShouldDiscardChanges()
    {
        await using var connection = await OpenConnectionAsync();
        await using var context = await CreateContextAsync(connection);
        await using var unitOfWork = new UnitOfWork(context);

        await unitOfWork.BeginTransactionAsync();

        context.SystemConfigurations.Add(new SystemConfiguration(ApplicationLanguage.Portuguese, "RibbonNight"));
        await unitOfWork.SaveChangesAsync();
        await unitOfWork.RollbackTransactionAsync();

        await using var verificationContext = await CreateContextAsync(connection);
        var persistedCount = await verificationContext.SystemConfigurations.CountAsync();

        Assert.Equal(0, persistedCount);
    }

    [Fact]
    public async Task SaveChangesAsync_ShouldPreserveCreatedOnUtc_WhenEntityIsModified()
    {
        await using var connection = await OpenConnectionAsync();
        await using var context = await CreateContextAsync(connection);

        var configuration = new SystemConfiguration(ApplicationLanguage.Portuguese, "ClassicTheme");
        context.SystemConfigurations.Add(configuration);
        await context.SaveChangesAsync();

        var originalCreatedOnUtc = configuration.CreatedOnUtc;

        configuration.UpdateVisualTheme("UpdatedTheme");
        context.Entry(configuration).Property(entity => entity.CreatedOnUtc).CurrentValue = originalCreatedOnUtc.AddDays(-3);

        await context.SaveChangesAsync();

        await using var verificationContext = await CreateContextAsync(connection);
        var persistedConfiguration = await verificationContext.SystemConfigurations.SingleAsync();

        Assert.Equal(originalCreatedOnUtc, persistedConfiguration.CreatedOnUtc);
        Assert.NotNull(persistedConfiguration.ModifiedOnUtc);
        Assert.True(persistedConfiguration.ModifiedOnUtc >= originalCreatedOnUtc);
    }

    private static async Task<SqliteConnection> OpenConnectionAsync()
    {
        var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();

        return connection;
    }

    private static async Task<ApplicationDbContext> CreateContextAsync(SqliteConnection connection)
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlite(connection)
            .Options;

        var context = new ApplicationDbContext(options);
        await context.Database.EnsureCreatedAsync();

        return context;
    }
}