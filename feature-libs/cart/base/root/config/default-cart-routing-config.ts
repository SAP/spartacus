/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultCartRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      cart: { paths: ['cart'] },
    },
  },
};
