/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface FeaturesConfig {
    /**
     * Enables displaying consignment tracking info in the order details view
     */
    consignmentTracking?: boolean;
  }
}
