namespace ND.Service.Domain.Common;

public abstract class AuditableEntity : BaseEntity
{
    public DateTime CreatedOnUtc { get; protected set; } = DateTime.UtcNow;

    public DateTime? ModifiedOnUtc { get; protected set; }

    protected void MarkAsModified()
    {
        ModifiedOnUtc = DateTime.UtcNow;
    }
}