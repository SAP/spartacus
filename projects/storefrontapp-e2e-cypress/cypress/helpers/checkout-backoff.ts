/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../sample-data/checkout-flow';
import { waitForPage } from './checkout-flow';

export function waitForDeliveryAddressdata() {
  cy.window().then((win) => {
    const { token } = JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth'));

    cy.requireDeliveryAddressAdded(sampleData.user.address, token);
  });
}

export function visitCheckoutDeliveryModePage() {
  const deliveryModePage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryModePage'
  );
  cy.visit('/checkout/delivery-mode');
  cy.wait(`@${deliveryModePage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-delivery-mode h2').should('contain', 'Delivery Method');
}
