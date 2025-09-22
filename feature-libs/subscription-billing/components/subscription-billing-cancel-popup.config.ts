/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SubscriptionCancelComponent } from './cancel-subscrption/subscription-cancel.component';

export const subscriptionCancelPopupConfig: LayoutConfig = {
  launch: {
    SUBSCRIPTION_CANCEL: {
      inlineRoot: true,
      component: SubscriptionCancelComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
