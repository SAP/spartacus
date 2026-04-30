/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../sample-data/checkout-flow';
import { waitForPage } from './navigation';
import { getAuthStorageKey } from './auth';

export function waitForDeliveryAddressdata() {
  cy.window().then((win) => {
    const { token } = JSON.parse(win.localStorage.getItem(getAuthStorageKey()));

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
  cy.get('cx-delivery-mode legend').should('contain', 'Delivery Options');
}
