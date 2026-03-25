using Microsoft.AspNetCore.Mvc;

namespace ND.Service.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new HealthResponse("ND.Service.Api", "Healthy", DateTime.UtcNow));
    }

    public sealed record HealthResponse(string Service, string Status, DateTime CheckedAtUtc);
}