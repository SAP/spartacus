/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    ACCOUNT_VERIFICATION_TOKEN = 'ACCOUNT_VERIFICATION_TOKEN',
    EXTEND_SESSION = 'EXTEND_SESSION',
  }
}
