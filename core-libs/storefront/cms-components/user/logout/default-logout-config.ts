/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogoutConfig } from './logout-config';

export const defaultLogoutConfig: LogoutConfig = {
  logout: {
    redirectRoute: 'my-account/saved-carts',
  },
};
