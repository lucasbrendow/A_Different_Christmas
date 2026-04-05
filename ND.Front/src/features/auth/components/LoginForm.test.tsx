import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../../test/renderWithProviders';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('shows validation messages when submitting empty credentials', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm isSubmitting={false} onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /entrar na área administrativa/i }));

    expect(await screen.findByText(/o e-mail é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/a senha é obrigatória/i)).toBeInTheDocument();
  });

  it('submits typed credentials', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    renderWithProviders(<LoginForm isSubmitting={false} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/e-mail/i), 'admin@differentchristmas.org');
    await user.type(screen.getByLabelText(/senha/i), 'secure123');
    await user.click(screen.getByRole('button', { name: /entrar na área administrativa/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'admin@differentchristmas.org',
      password: 'secure123',
      rememberMe: true,
    });
  });
});