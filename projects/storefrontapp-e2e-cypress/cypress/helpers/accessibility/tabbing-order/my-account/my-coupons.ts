/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  claimCoupon,
  CouponWithOpenCatalog,
} from '../../../coupons/my-coupons';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-my-coupons';

export function checkoutMyCouponsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/coupons');

  claimCoupon(CouponWithOpenCatalog);

  verifyTabbingOrder(containerSelector, config);
}
