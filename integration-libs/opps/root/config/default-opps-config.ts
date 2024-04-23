/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OppsConfig } from './opps-config';

export const defaultOppsConfig: OppsConfig = {
  opps: {
    couponcodes: {
      httpHeaderName: 'couponcodes',
      urlParameter: 'couponcodes',
      localStorageKey: 'opps-couponcodes',
    },
    loginRequired: {
      urlParameter: 'loginRequired',
    },
  },
};
