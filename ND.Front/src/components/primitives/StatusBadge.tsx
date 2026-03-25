interface StatusBadgeProps {
  tone: 'success' | 'neutral' | 'danger';
  children: string;
}

export function StatusBadge({ tone, children }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${tone}`}>{children}</span>;
}
