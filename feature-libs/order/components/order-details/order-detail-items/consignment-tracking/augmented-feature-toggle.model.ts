/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface FeatureToggles {
    /**
     * Enables displaying consignment tracking info in the order details view
     *
     * It's is enabled by default since v1.2.
     */
    consignmentTracking?: boolean;
  }
}
