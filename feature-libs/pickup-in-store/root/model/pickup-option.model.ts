import { PointOfService } from '@spartacus/core';

export type PickupOption = 'delivery' | 'pickup';
export type AugmentedPointOfService = PointOfService & {
  pickupOption: PickupOption;
};

export type SetDeliveryOptionPayload = {
  cartId: string;
  pickupOption: PickupOption;
  name: string;
  entryNumber: number;
  userId: string;
  productCode?: string;
  quantity?: number;
};
