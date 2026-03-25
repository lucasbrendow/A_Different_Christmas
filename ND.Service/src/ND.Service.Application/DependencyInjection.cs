using Microsoft.Extensions.DependencyInjection;

namespace ND.Service.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services;
    }
}