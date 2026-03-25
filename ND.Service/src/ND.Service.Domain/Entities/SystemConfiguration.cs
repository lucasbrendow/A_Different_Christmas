using ND.Service.Domain.Common;
using ND.Service.Domain.Enums;

namespace ND.Service.Domain.Entities;

public sealed class SystemConfiguration : AuditableEntity
{
    private SystemConfiguration()
    {
    }

    public SystemConfiguration(ApplicationLanguage defaultLanguage, string visualTheme)
    {
        if (string.IsNullOrWhiteSpace(visualTheme))
        {
            throw new ArgumentException("Visual theme must be provided.", nameof(visualTheme));
        }

        DefaultLanguage = defaultLanguage;
        VisualTheme = visualTheme.Trim();
        IsActive = true;
    }

    public ApplicationLanguage DefaultLanguage { get; private set; }

    public string VisualTheme { get; private set; } = string.Empty;

    public bool IsActive { get; private set; }

    public void UpdateDefaultLanguage(ApplicationLanguage defaultLanguage)
    {
        DefaultLanguage = defaultLanguage;
        MarkAsModified();
    }

    public void UpdateVisualTheme(string visualTheme)
    {
        if (string.IsNullOrWhiteSpace(visualTheme))
        {
            throw new ArgumentException("Visual theme must be provided.", nameof(visualTheme));
        }

        VisualTheme = visualTheme.Trim();
        MarkAsModified();
    }

    public void Deactivate()
    {
        IsActive = false;
        MarkAsModified();
    }
}