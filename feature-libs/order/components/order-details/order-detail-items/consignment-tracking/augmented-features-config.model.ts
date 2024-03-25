/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

// NOTE: It's EXCEPTIONALLY a part of `FeaturesConfigContent` but not of `FeatureToggles`,
// because it's a permanent feature enabler, but not a short-living feature toggle
// covering a breaking change.
//
// It's is enabled by default since v1.2.
declare module '@spartacus/core' {
  interface FeaturesConfigContent {
    /**
     * Enables displaying consignment tracking info in the order details view
     */
    consignmentTracking?: boolean;
  }
}
