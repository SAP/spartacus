/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '../../../layout/index';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';

export const defaultCouponLayoutConfig: LayoutConfig = {
  launch: {
    COUPON: {
      inlineRoot: true,
      component: CouponDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
