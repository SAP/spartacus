import { PointOfService } from '@spartacus/core';

export type PickupOption = 'delivery' | 'pickup';
export type AugmentedPointOfService = PointOfService & {
  pickupOption: PickupOption;
};

export type SetPickupOptionInStorePayload = {
  deliveryPointOfService: { name: string };
  quantity: number;
};

export interface SetPickupOptionDeliveryPayload
  extends SetPickupOptionInStorePayload {
  product: { code: string };
}
