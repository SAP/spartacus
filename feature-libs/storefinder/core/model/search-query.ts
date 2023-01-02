/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoPoint } from '@spartacus/core';

export interface StoreFinderSearchQuery {
  queryText?: string;
  longitudeLatitude?: GeoPoint;
  useMyLocation?: boolean;
  radius?: number;
}
