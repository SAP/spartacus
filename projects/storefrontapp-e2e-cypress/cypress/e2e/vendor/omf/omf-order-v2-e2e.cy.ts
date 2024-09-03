/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ELECTRONICS_BASESITE,
  ELECTRONICS_CURRENCY,
  loginUser,
  signOutUser,
} from '../../../helpers/checkout-flow';
import {
  interceptOrdersEndpoint,
  waitForResponse,
} from '../../../helpers/order-history';
const omfTester = {
  email: 'keenreviewer14@hybris.com',
  password: 'Welcome@1',
};
import { OmfConfig } from '@spartacus/core';

const headerName = 'guid';

function systemConfig() {
  Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  Cypress.env('BASE_CURRENCY', ELECTRONICS_CURRENCY);
  cy.cxConfig({
    omf: {
      guidHttpHeaderName: headerName,
    },
  } as OmfConfig);
}
const orderCode = '2200006056';

function intercepOrderDetailsHttpCalls(code: string, alias: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${code}?*`
  ).as(alias);
}
function navigateToOrderDetailsV2() {
  cy.contains('a', orderCode)
    .invoke('attr', 'href')
    .then((href) => {
      const guidMatch = href.match(/guid=([\w-]+)/);

      const orderGuid = guidMatch ? guidMatch[1] : null;
      intercepOrderDetailsHttpCalls(orderCode, 'orderDetails');

      cy.contains('a', '2200006056').click();
      cy.wait('@orderDetails').then((xhr) => {
        expect(xhr.request.headers).to.have.property(headerName, orderGuid);
      });
      cy.get('cx-breadcrumb h1').should('contain', 'Order Details');
      cy.url().should((url) => {
        const params = new URLSearchParams(url.split('?')[1]);
        expect(params.has('guid')).to.be.true;
      });
    });
}

function navigateToOrderHistoryV2() {
  const ordersAlias = interceptOrdersEndpoint();
  intercepOrderDetailsHttpCalls(orderCode, 'orderHistoryV2');
  cy.visit(
    `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env('BASE_CURRENCY')}/login`
  );
  loginUser(omfTester);
  cy.visit('/my-account/orders');
  waitForResponse(ordersAlias);
  cy.wait('@orderHistoryV2').then((xhr) => {
    expect(xhr.request.headers).to.have.property(headerName);
  });
}

describe('OMF - Navigate from Order History to Order Details Page', () => {
  it('should load Order History and navigate to Order Details (MY_ACCOUT_V2 = true)', () => {
    cy.restoreLocalStorage();
    Cypress.env('CX_MY_ACCOUNT_V2', true);
    systemConfig();
    navigateToOrderHistoryV2();
    navigateToOrderDetailsV2();
    signOutUser();
  });
});
