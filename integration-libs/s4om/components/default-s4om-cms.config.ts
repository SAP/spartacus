/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthGuard, CmsConfig } from '@spartacus/core';
import { S4omOrderDetailAttachmentsComponent } from './order-detail-attachments/s4om-order-detail-attachments.component';

export const defaultS4omCmsConfig: CmsConfig = {
  cmsComponents: {
    S4omOrderAttachmentsComponent: {
      component: S4omOrderDetailAttachmentsComponent,
      guards: [AuthGuard],
    },
  },
};
