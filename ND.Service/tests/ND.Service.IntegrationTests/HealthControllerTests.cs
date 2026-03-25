using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace ND.Service.IntegrationTests;

public sealed class HealthControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _httpClient;

    public HealthControllerTests(WebApplicationFactory<Program> factory)
    {
        _httpClient = factory.CreateClient();
    }

    [Fact]
    public async Task Get_ShouldReturnSuccessStatusCode()
    {
        var response = await _httpClient.GetAsync("/api/health");

        response.EnsureSuccessStatusCode();
    }
}