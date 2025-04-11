/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthGuard, CmsConfig } from '@spartacus/core';
import { OrderDetailAttachmentsComponent } from '../order-detail-attachments/order-detail-attachments.component';

export const defaultOrderCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountOrderDetailsOrderAttachmentsComponent: {
      component: OrderDetailAttachmentsComponent,
      guards: [AuthGuard],
    },
  },
};
