/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../../tabbing-order';
import { doPlaceOrder } from '../../../order-history';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function paymentDetailsTabbingOrder(config: TabElement[]) {
  doPlaceOrder().then(() =>
    doPlaceOrder().then(() => {
      cy.visit('/my-account/payment-details');

      verifyTabbingOrder(containerSelector, config);
    })
  );
}
