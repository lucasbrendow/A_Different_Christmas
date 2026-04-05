import type { CampaignImpactSummary } from '../../types/app';

function wait(delayInMilliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayInMilliseconds);
  });
}

export async function getCampaignImpactSummary(): Promise<CampaignImpactSummary> {
  await wait(300);

  return {
    supportedChildren: 284,
    collectedGifts: 197,
    participatingGuardians: 163,
    completionRate: 69,
    lastUpdatedUtc: '2026-04-05T19:00:00.000Z',
  };
}