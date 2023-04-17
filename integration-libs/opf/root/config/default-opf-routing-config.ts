/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';
import { defaultOpfConfig } from './default-opf-config';

export const defaultOPFRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      paymentresponse: {
        paths: [
          defaultOpfConfig.opf?.successUrl as string,
          defaultOpfConfig.opf?.cancelUrl as string,
        ],
      },
    },
  },
};
