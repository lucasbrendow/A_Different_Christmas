import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormField } from '../../../components/form/FormField';
import { useAppTranslation } from '../../../hooks/useAppTranslation';
import type { LoginCredentials } from '../../../types/app';

interface LoginFormProps {
  isSubmitting: boolean;
  errorMessage?: string;
  onSubmit: (values: LoginCredentials) => Promise<void> | void;
}

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'auth.validationEmailRequired')
    .email('auth.validationEmailInvalid'),
  password: z.string().min(1, 'auth.validationPasswordRequired').min(6, 'auth.validationPasswordMin'),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ isSubmitting, errorMessage, onSubmit }: LoginFormProps) {
  const { t } = useAppTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    resolver: zodResolver(loginSchema),
  });

  return (
    <section className="panel login-panel">
      <div className="login-panel__header">
        <div>
          <p className="eyebrow">{t('auth.formEyebrow')}</p>
          <h2>{t('auth.formTitle')}</h2>
        </div>

        <p>{t('auth.formDescription')}</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit((values) => onSubmit(values))}>
        <FormField
          htmlFor="email"
          label={t('auth.emailLabel')}
          error={errors.email ? t(errors.email.message as string) : undefined}
        >
          <input autoComplete="email" id="email" type="email" {...register('email')} disabled={isSubmitting} />
        </FormField>

        <FormField
          htmlFor="password"
          label={t('auth.passwordLabel')}
          error={errors.password ? t(errors.password.message as string) : undefined}
        >
          <input
            autoComplete="current-password"
            id="password"
            type="password"
            {...register('password')}
            disabled={isSubmitting}
          />
        </FormField>

        <label className="login-form__remember" htmlFor="rememberMe">
          <input id="rememberMe" type="checkbox" {...register('rememberMe')} disabled={isSubmitting} />
          <span>{t('auth.rememberMe')}</span>
        </label>

        <div className="login-panel__actions">
          {errorMessage ? (
            <div aria-live="polite" className="login-feedback" role="status">
              {errorMessage}
            </div>
          ) : null}

          <button className="button button--primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? `${t('common.loading')}...` : t('auth.submit')}
          </button>
        </div>
      </form>

      <p className="login-note">{t('auth.helper')}</p>
    </section>
  );
}