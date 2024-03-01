/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface FeatureFlags {
    /**
     * Flag to enable displaying the promotions in the Product Summary component
     */
    showPromotionsInPDP?: boolean;
  }
}
