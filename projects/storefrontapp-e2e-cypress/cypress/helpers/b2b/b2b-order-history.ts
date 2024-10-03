/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../../sample-data/b2b-order-history';

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
