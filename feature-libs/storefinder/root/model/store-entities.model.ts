/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointOfService } from '@spartacus/core';

export enum StoreFinderOutlets {
  PREFERRED_STORE = 'cx-pick-up-in-store-make-my-store',
}

export interface StoreEntities {
  pointOfServices?: Array<PointOfService>;
}
