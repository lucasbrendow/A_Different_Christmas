using ND.Service.Domain.Entities;
using ND.Service.Domain.Enums;
using Xunit;

namespace ND.Service.UnitTests;

public sealed class SystemConfigurationTests
{
    [Fact]
    public void Constructor_ShouldCreateActiveConfiguration()
    {
        var configuration = new SystemConfiguration(ApplicationLanguage.Portuguese, "ChristmasClassic");

        Assert.Equal(ApplicationLanguage.Portuguese, configuration.DefaultLanguage);
        Assert.Equal("ChristmasClassic", configuration.VisualTheme);
        Assert.True(configuration.IsActive);
    }
}