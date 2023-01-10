export interface IDistributionBase {
  variantId: string;
  rollout: number;
}

export interface IDistribution extends IDistributionBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}
