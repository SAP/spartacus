/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { PickRequiredDeep } from '../utils/type-utils';

/** The options for receiving a product, either 'delivery' or 'pickup'. */
export type PickupOption = 'delivery' | 'pickup';

/** A point of service with the additional pickup option information. */
export type AugmentedPointOfService = PointOfService & {
  pickupOption: PickupOption;
};

export type SetPickupOptionToPickupInStorePayload = PickRequiredDeep<
  OrderEntry,
  'deliveryPointOfService.name' | 'quantity'
>;

export type SetPickupOptionToDeliveryPayload =
  SetPickupOptionToPickupInStorePayload &
    PickRequiredDeep<OrderEntry, 'product.code'>;
