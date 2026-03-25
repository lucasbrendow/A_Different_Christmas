import { useCallback, useEffect, useState } from 'react';

import { getHealthStatus } from '../services/health/healthService';
import type { AsyncDataState, HealthStatus } from '../types/app';

const initialState: AsyncDataState<HealthStatus> = {
  status: 'idle',
  data: null,
  error: null,
};

export function useHealthStatus() {
  const [state, setState] = useState<AsyncDataState<HealthStatus>>(initialState);

  const load = useCallback(async (signal?: AbortSignal) => {
    setState((currentState) => ({
      ...currentState,
      status: 'loading',
      error: null,
    }));

    try {
      const data = await getHealthStatus(signal);

      setState({
        status: 'success',
        data,
        error: null,
      });
    } catch (error) {
      if (signal?.aborted) {
        return;
      }

      setState({
        status: 'error',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void load(controller.signal);

    return () => controller.abort();
  }, [load]);

  return {
    ...state,
    reload: () => load(),
  };
}
