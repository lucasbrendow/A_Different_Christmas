import { useEffect, useState } from 'react';

import { getCampaignImpactSummary } from '../services/campaign/campaignImpactService';
import type { AsyncDataState, CampaignImpactSummary } from '../types/app';

const initialState: AsyncDataState<CampaignImpactSummary> = {
  status: 'idle',
  data: null,
  error: null,
};

export function useCampaignImpact() {
  const [state, setState] = useState<AsyncDataState<CampaignImpactSummary>>(initialState);

  async function loadCampaignImpact() {
    setState((currentState) => ({
      ...currentState,
      status: 'loading',
      error: null,
    }));

    try {
      const data = await getCampaignImpactSummary();

      setState({
        status: 'success',
        data,
        error: null,
      });
    } catch {
      setState({
        status: 'error',
        data: null,
        error: 'auth.impactError',
      });
    }
  }

  useEffect(() => {
    void loadCampaignImpact();
  }, []);

  return {
    state,
    reload: loadCampaignImpact,
  };
}