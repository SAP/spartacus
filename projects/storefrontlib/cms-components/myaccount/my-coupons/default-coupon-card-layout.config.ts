/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '../../../layout/index';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';
import { ClaimDialogComponent } from './claim-dialog/claim-dialog.component';

export const defaultCouponLayoutConfig: LayoutConfig = {
  launch: {
    COUPON: {
      inlineRoot: true,
      component: CouponDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
    CLAIM_DIALOG: {
      inlineRoot: true,
      component: ClaimDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
