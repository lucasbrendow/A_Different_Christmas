import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormField } from '../../../components/form/FormField';
import { useAppTranslation } from '../../../hooks/useAppTranslation';
import type { DashboardFilters } from '../../../types/app';

interface DashboardFiltersFormProps {
  initialValues: DashboardFilters;
  onApply: (values: DashboardFilters) => void;
}

const dashboardFiltersSchema = z.object({
  guardianName: z.string().trim().max(50, 'dashboard.validationGuardianMax'),
  neighborhood: z.string().trim().max(50, 'dashboard.validationNeighborhoodMax'),
  deliveryStatus: z.enum(['all', 'pendingGift', 'receivedGift', 'delivered']),
});

type DashboardFiltersFormValues = z.infer<typeof dashboardFiltersSchema>;

export function DashboardFiltersForm({ initialValues, onApply }: DashboardFiltersFormProps) {
  const { t } = useAppTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DashboardFiltersFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(dashboardFiltersSchema),
  });

  return (
    <form className="panel form-panel" onSubmit={handleSubmit((values) => onApply(values))}>
      <div className="panel__header">
        <div>
          <p className="eyebrow">Foundation</p>
          <h2>{t('dashboard.filtersTitle')}</h2>
        </div>
        <p>{t('dashboard.filtersDescription')}</p>
      </div>

      <div className="form-grid">
        <FormField
          htmlFor="guardianName"
          label={t('dashboard.guardianName')}
          error={errors.guardianName ? t(errors.guardianName.message as string) : undefined}
          hint={t('common.optional')}
        >
          <input id="guardianName" {...register('guardianName')} />
        </FormField>

        <FormField
          htmlFor="neighborhood"
          label={t('dashboard.neighborhood')}
          error={errors.neighborhood ? t(errors.neighborhood.message as string) : undefined}
          hint={t('common.optional')}
        >
          <input id="neighborhood" {...register('neighborhood')} />
        </FormField>

        <FormField htmlFor="deliveryStatus" label={t('dashboard.deliveryStatus')}>
          <select id="deliveryStatus" {...register('deliveryStatus')}>
            <option value="all">{t('dashboard.deliveryStatusAll')}</option>
            <option value="pendingGift">{t('dashboard.deliveryStatusPendingGift')}</option>
            <option value="receivedGift">{t('dashboard.deliveryStatusReceivedGift')}</option>
            <option value="delivered">{t('dashboard.deliveryStatusDelivered')}</option>
          </select>
        </FormField>
      </div>

      <button className="button button--primary" type="submit">
        {t('common.apply')}
      </button>
    </form>
  );
}
