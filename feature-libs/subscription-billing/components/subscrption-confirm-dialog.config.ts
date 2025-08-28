/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SubscriptionCancelComponent } from './cancel-subscrption/subscription-cancel.component';

export const subscriptionCancelPopupConfig: LayoutConfig = {
  launch: {
    SUBSCRIPTION_CONFIRMATION: {
      inlineRoot: true,
      component: SubscriptionCancelComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

