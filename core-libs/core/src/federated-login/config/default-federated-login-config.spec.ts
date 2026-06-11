/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defaultFederatedLoginConfigFactory } from './default-federated-login-config';
import { FederatedLoginConfig } from './federated-login-config';

const standardDefaultConfig: FederatedLoginConfig = {
  federatedLogin: {
    enabled: false,
    contextParameterName: 'ctx',
    loginHosts: [],
    originMap: {},
  },
};

describe('defaultFederatedLoginConfigFactory', () => {
  it('should generate the standard default config', () => {
    const actual = defaultFederatedLoginConfigFactory();

    expect(actual).toEqual(standardDefaultConfig);
  });
});
