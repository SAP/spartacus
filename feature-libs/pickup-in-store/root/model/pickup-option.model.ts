import { PointOfService } from "@spartacus/core";

export type PickupOption = 'delivery' | 'pickup';
export type AugmentedPointOfService = PointOfService & {
  pickupOption: PickupOption;
};
