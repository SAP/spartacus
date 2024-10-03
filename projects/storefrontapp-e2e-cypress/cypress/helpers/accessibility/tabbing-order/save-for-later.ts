/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { addProduct, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.CartPageTemplate';

export function saveForLaterTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();
  verifyTabbingOrder(containerSelector, config);
}

function addCartItemsAndLoadCart() {
  addProduct();

  cy.get('cx-cart-item').within(() => {
    cy.findAllByText(/Save For Later/i)
      .first()
      .click();
  });
  cy.get('cx-cart-item button:not([disabled]).cx-sfl-btn');
}
