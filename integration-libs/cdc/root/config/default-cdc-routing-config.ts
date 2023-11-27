/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const cdcRoutesConfig: RoutesConfig = {
  cdcLogin: {
    paths: ['/cdc/login'],
    protected: false,
    authFlow: true,
  },
  cdcCheckoutLogin: {
    paths: ['/cdc/checkout-login'],
    protected: false,
    authFlow: true,
  },
  cdcOrgRegistration: {
    paths: ['/cdc/register-org'],
    protected: false,
    authFlow: true,
  },
};

export const defaultCdcRoutingConfig: RoutingConfig = {
  routing: {
    routes: cdcRoutesConfig,
  },
};
