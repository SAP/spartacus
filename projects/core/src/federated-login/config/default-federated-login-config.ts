/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FederatedLoginConfig } from './federated-login-config';

export function defaultFederatedLoginConfigFactory(): FederatedLoginConfig {
  return {
    federatedLogin: {
      enabled: true,
      contextParameterName: 'context',
      loginDomains: [
        // 'localhost:4200',
        'login.local:4200',
      ],
      originMap: {
        de: 'https://electronics-storefront.de:4200',
        es: 'https://electronics-storefront.es:4200',
        pd: 'https://powertools-storefront.de:4200',
      },
    },
  } satisfies FederatedLoginConfig;
}
