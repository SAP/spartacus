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
        'electronics.de': 'https://electronics-spa.x',
        de: 'https://electronics-spa.x',
        es: 'https://apparel-uk-spa.x',
        pd: 'https://powertools-spa.x',
      },
    },
  } satisfies FederatedLoginConfig;
}
