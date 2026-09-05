/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginB2bUser } from '../helpers/a11y-b2b.checkout';
import { setAddToCartQuantity } from '../../../helpers/b2b/b2b-quote';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const PRODUCT_AMOUNT_30: number = 30;

describe('B2b Quotes Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
    cy.a11yContinuumSetup();
    loginB2bUser();
  });

  it('request quote', () => {
    cy.visit(`product/${TEST_PRODUCT_HAMMER_DRILLING_ID}`);
    setAddToCartQuantity(String(PRODUCT_AMOUNT_30));
    cy.get('button').contains(' Add to cart ').click();
    cy.get('.cx-dialog-buttons button').contains(' view cart ').click();
    cy.get('button').contains(' Request Quote').click();
    cy.get('cx-quote-items cx-cart-item-list');
    cy.get('main').a11yRunContinuumTest();
  });

  it('cancel quote', () => {
    cy.get('button').contains(' Cancel Quote ').click();
    cy.get('.cx-modal-content').a11yRunContinuumTest();
    cy.get('button').contains(' No ').click();
  });

  it('submit quote', () => {
    cy.get('button').contains(' Submit Quote ').click();
    cy.get('cx-quote-confirm-dialog').a11yRunContinuumTest();
    cy.get('button').contains(' Yes ').click();
    cy.get('cx-global-message').a11yRunContinuumTest();
  });

  it('quote list', () => {
    cy.get('main cx-quote-list table');
    cy.get('main').a11yRunContinuumTest();
  });

  it('quote details', () => {
    cy.get('.cx-nav-caret').first().click();
    cy.get('cx-quote-items cx-cart-item-list');
    cy.get('main').a11yRunContinuumTest();
  });
});
