/*
 * Copyright (C) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
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
