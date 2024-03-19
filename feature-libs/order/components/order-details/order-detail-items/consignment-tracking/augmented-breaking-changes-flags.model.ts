/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface BreakingChangesFlags {
    /**
     * Flag to enable the consignment tracking feature.
     */
    consignmentTracking?: boolean;
  }
}
