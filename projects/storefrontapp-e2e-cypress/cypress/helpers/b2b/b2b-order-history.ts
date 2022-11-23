/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../../sample-data/b2b-order-history';
import * as quickOrder from './b2b-quick-order';

export function loginB2bUnitOrderViewer() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccount);
}

export function loginB2bUnitOrderViewer2() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccount2);
}

export function loginB2bUnitOrderViewerManager() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerManagerAccount);
}

export function loginB2bCommonUser() {
  cy.requireLoggedIn(sampleData.b2bCommonUserAccount);
}

export function doPlaceB2BOrder(productData?: any) {
  let stateAuth: any;

  return cy
    .window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      stateAuth = token;
      return cy.requireProductAddedToCart(stateAuth, productData);
    })
    .then(({ cartId }) => {
      cy.requirePaymentTypeSelected(stateAuth, cartId);
      cy.requireCostCenterAddressSelected(stateAuth, cartId);
      cy.requireDeliveryMethodSelected(stateAuth, cartId);

      return cy.requirePlacedOrder(stateAuth, cartId);
    });
}

export function addOrder() {
  quickOrder.visitQuickOrderPage();
  quickOrder.addProductToTheList('3881074');
  quickOrder.addToCart();
  cy.visit(`/powertools-spa/en/USD/cart`);
  cy.contains('Proceed to Checkout')
    .should('be.visible')
    .click({ force: true });
  cy.get('input[id="paymentType-ACCOUNT"]').click({ force: true });
  cy.wait(100);
  cy.contains('Continue').should('be.visible').click({ force: true });
  cy.wait(1000);
  cy.contains('Continue').should('be.visible').click();
  cy.wait(1000);
  cy.get('div.col-md-12>button').eq(1).should('be.visible').click();
  cy.wait(100);
  cy.get('input[ng-reflect-name=termsAndConditions]')
    .should('be.visible')
    .click({ force: true });
  cy.wait(100);
  cy.get('form.cx-place-order-form>button')
    .should('be.visible')
    .click({ force: true });
  cy.wait(100);
}
