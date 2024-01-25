/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointOfService } from '@spartacus/core';

/** The options for receiving a product, either 'delivery' or 'pickup'. */
export type PickupOption = 'delivery' | 'pickup';

/** A point of service with the additional pickup option information. */
export type AugmentedPointOfService = PointOfService & {
  pickupOption: PickupOption;
};
