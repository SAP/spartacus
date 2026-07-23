/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as storefront from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    B2B_UNIT_SELECTION = 'B2B_UNIT_SELECTION',
  }
}

// Runtime registration: extends the LAUNCH_CALLER enum at runtime.
// Using namespace import avoids re-declaring LAUNCH_CALLER in the same scope,
// which would trigger a variable-shadowing lint/Sonar violation.
(storefront.LAUNCH_CALLER as any)['B2B_UNIT_SELECTION'] = 'B2B_UNIT_SELECTION';
