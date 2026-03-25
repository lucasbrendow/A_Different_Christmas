import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../test/renderWithProviders';
import { DashboardFiltersForm } from './DashboardFiltersForm';

describe('DashboardFiltersForm', () => {
  it('shows a validation message when the guardian name is too long', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <DashboardFiltersForm
        initialValues={{
          guardianName: '',
          neighborhood: '',
          deliveryStatus: 'all',
        }}
        onApply={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText('Nome do responsável'), 'a'.repeat(51));
    await user.click(screen.getByRole('button', { name: 'Aplicar filtros' }));

    expect(
      await screen.findByText('O nome do responsável deve ter no máximo 50 caracteres.'),
    ).toBeInTheDocument();
  });
});
