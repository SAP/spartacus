/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FederatedLoginConfig } from './federated-login-config';

export function defaultFederatedLoginConfigFactory(): FederatedLoginConfig {
  return {
    federatedLogin: {
      enabled: false,
      contextParameterName: 'ctx',
      loginHosts: [],
      originMap: {},
    },
  } satisfies FederatedLoginConfig;
}
