/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiConfig } from './opf-api.config';

export const defaultOpfApiBaseConfig: OpfApiConfig = {
  backend: {
    opfApi: {
      endpoints: {
        getActiveConfigurations: 'active-configurations',
      },
    },
  },
};
