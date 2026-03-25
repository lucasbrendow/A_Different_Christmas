import type { PropsWithChildren } from 'react';

interface FormFieldProps extends PropsWithChildren {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
}

export function FormField({ children, label, htmlFor, error, hint }: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint ? <span className="form-field__hint">{hint}</span> : null}
      {error ? <span className="form-field__error">{error}</span> : null}
    </div>
  );
}
