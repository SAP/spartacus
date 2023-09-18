/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultOpfCheckoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      opfCheckoutReviewOrder: { paths: ['checkout/opf-payment-and-review'] },
    },
  },
};
