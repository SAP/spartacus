/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SubscriptionModalComponent } from './modal-subscrption/subscription-modal.component';

export const subscriptionCancelPopupConfig: LayoutConfig = {
  launch: {
    SUBSCRIPTION_CONFIRMATION: {
      inlineRoot: true,
      component: SubscriptionModalComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
