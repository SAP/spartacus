/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addPaymentMethod,
  testPaymentDetail,
} from '../../../helpers/payment-methods';
import { products } from '../../../helpers/cart';

function addPaymentMethods() {
  cy.visit(`product/${products[0].code}`);
  cy.get('cx-add-to-cart button').contains(' Add to cart ').click();
  cy.get('.cx-dialog-actions button').contains(' view cart ').click();
  cy.get('cx-cart-item-list');
  addPaymentMethod(testPaymentDetail[0]);
  addPaymentMethod(testPaymentDetail[1]);
}

describe('Payment Methods Page accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('Empty page', () => {
    cy.visit('my-account/payment-details');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Page with cards', () => {
    addPaymentMethods();
    cy.visit('my-account/payment-details');
    cy.get('.cx-card');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Delete payment method', () => {
    cy.get('cx-card').first().find('button').click();
    cy.get('cx-card').first().a11yRunContinuumTest();
  });

  it('Set as default', () => {
    cy.get('cx-card').eq(1).find('button').first().click();
    cy.get('.alert-success').a11yRunContinuumTest();
  });
});
