/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SubscriptionBillingCartChargesComponent } from './cart-charges/subscription-billing-cart-charges.component';

export const subscriptionBillingCartLayoutConfig: LayoutConfig = {
  launch: {
    SUBSCRIPTION_CHARGES: {
      inlineRoot: true,
      component: SubscriptionBillingCartChargesComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
