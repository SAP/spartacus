/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  login: {
    paths: ['login'],
    protected: false,
    authFlow: true,
  },
  loginForm: {
    paths: [], //overriding to avoid same path in different routes
    protected: false,
    authFlow: true,
  },
};

export const defaultCdcRoutingConfig: RoutingConfig = {
  routing: {
    routes: cdcRoutesConfig,
  },
};
