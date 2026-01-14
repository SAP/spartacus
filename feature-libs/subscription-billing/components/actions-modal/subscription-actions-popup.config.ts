/*
 * Copyright (C) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SubscriptionActionsModalComponent } from './subscription-actions-modal.component';

export const subscriptionActionsPopupConfig: LayoutConfig = {
  launch: {
    SUBSCRIPTION_ACTION_CONFIRMATION: {
      inlineRoot: true,
      component: SubscriptionActionsModalComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
