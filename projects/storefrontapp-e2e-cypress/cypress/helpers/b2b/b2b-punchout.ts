/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createCart } from '../../support/utils/cart';
import { login, setSessionData } from '../../support/utils/login';

export const mockPunchoutSession = {
  customerId: 'punchout.customer@punchoutorg.com',
  password: 'pw4all',
  cartId: '',
  punchOutLevel: '',
  punchOutOperation: '',
  selectedItem: '',
  token: {
    accessToken: '',
    tokenType: 'bearer',
  },
};

export function createPunchoutSessionIntercept(
  mockResponse = {},
  alias = 'createPunchoutSession'
) {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/punchout/sessions/*`,
    },
    mockResponse
  ).as(alias);
}

const mockPunchoutRequisition = {
  browseFormPostUrl:
    'https://service.ariba.com/CatalogTester.aw/125008022/ad/handlePunchOutOrder/IYqU7ZsZqGsYjtZN8Q7CFIVPTp0SEbmT0.376639374547187132?awr=2&u=MGudTNm4&awps=YB89qJQvAkx7HHIr',
  orderAsCXML:
    'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgY1hNTCBTWVNURU0gImh0dHA6Ly94bWwuY1hNTC5vcmcvc2NoZW1hcy9jWE1MLzEuMi4wNTEvY1hNTC5kdGQiPjxjWE1MIHBheWxvYWRJRD0iYzNlMWMzMTYtODFlYi00YTg2LWJiMGQtMDEyMjRhNmI4NzlmIiB0aW1lc3RhbXA9IjIwMjUtMDYtMTNUMDk6MTg6MjAtMDQ6MDAiIHhtbDpsYW5nPSJlbi1VUyI+PEhlYWRlcj48RnJvbT48Q3JlZGVudGlhbCBkb21haW49Ik5ldHdvcmtJRCI+PElkZW50aXR5PkFOMDE2NjU2MzIwNTQtVDwvSWRlbnRpdHk+PC9DcmVkZW50aWFsPjwvRnJvbT48VG8+PENyZWRlbnRpYWwgZG9tYWluPSJBcmliYU5ldHdvcmtVc2VySWQiPjxJZGVudGl0eT5zeXNhZG1pbkBhcmliYS5jb208L0lkZW50aXR5PjwvQ3JlZGVudGlhbD48L1RvPjxTZW5kZXI+PENyZWRlbnRpYWwgZG9tYWluPSJBcmliYU5ldHdvcmtVc2VySWQiPjxJZGVudGl0eT5zeXNhZG1pbkBhcmliYS5jb208L0lkZW50aXR5PjwvQ3JlZGVudGlhbD48L1NlbmRlcj48L0hlYWRlcj48TWVzc2FnZT48UHVuY2hPdXRPcmRlck1lc3NhZ2U+PEJ1eWVyQ29va2llPklZcVU3WnNacUdzWWp0Wk44UTdDRklWUFRwMFNFYm1UMC4zNzY2MzkzNzQ1NDcxODcxMzI8L0J1eWVyQ29va2llPjxQdW5jaE91dE9yZGVyTWVzc2FnZUhlYWRlciBvcGVyYXRpb25BbGxvd2VkPSJlZGl0Ij48VG90YWw+PE1vbmV5IGN1cnJlbmN5PSJVU0QiPjAuMDwvTW9uZXk+PC9Ub3RhbD48L1B1bmNoT3V0T3JkZXJNZXNzYWdlSGVhZGVyPjwvUHVuY2hPdXRPcmRlck1lc3NhZ2U+PC9NZXNzYWdlPjwvY1hNTD4=',
};

// const mockPunchoutRequisitionBackTo = {
//   "browseFormPostUrl" : "https://service.ariba.com/CatalogTester.aw/125008022/ad/handlePunchOutOrder/IYqU7ZsZqGsYjtZN8Q7CFIVPTp0SEbmT0.376639374547187132?awr=2&u=MGudTNm4&awps=YB89qJQvAkx7HHIr",
//   "orderAsCXML" : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgY1hNTCBTWVNURU0gImh0dHA6Ly94bWwuY1hNTC5vcmcvc2NoZW1hcy9jWE1MLzEuMi4wNTEvY1hNTC5kdGQiPjxjWE1MIHBheWxvYWRJRD0iMmQ0NDY2ZTktNjM5Ny00N2UxLTgwMTQtY2YyMTY1NjdlMTRiIiB0aW1lc3RhbXA9IjIwMjUtMDYtMTNUMDk6MTk6MzAtMDQ6MDAiIHhtbDpsYW5nPSJlbi1VUyI+PEhlYWRlcj48RnJvbT48Q3JlZGVudGlhbCBkb21haW49Ik5ldHdvcmtJRCI+PElkZW50aXR5PkFOMDE2NjU2MzIwNTQtVDwvSWRlbnRpdHk+PC9DcmVkZW50aWFsPjwvRnJvbT48VG8+PENyZWRlbnRpYWwgZG9tYWluPSJBcmliYU5ldHdvcmtVc2VySWQiPjxJZGVudGl0eT5zeXNhZG1pbkBhcmliYS5jb208L0lkZW50aXR5PjwvQ3JlZGVudGlhbD48L1RvPjxTZW5kZXI+PENyZWRlbnRpYWwgZG9tYWluPSJBcmliYU5ldHdvcmtVc2VySWQiPjxJZGVudGl0eT5zeXNhZG1pbkBhcmliYS5jb208L0lkZW50aXR5PjwvQ3JlZGVudGlhbD48L1NlbmRlcj48L0hlYWRlcj48TWVzc2FnZT48UHVuY2hPdXRPcmRlck1lc3NhZ2U+PEJ1eWVyQ29va2llPklZcVU3WnNacUdzWWp0Wk44UTdDRklWUFRwMFNFYm1UMC4zNzY2MzkzNzQ1NDcxODcxMzI8L0J1eWVyQ29va2llPjxQdW5jaE91dE9yZGVyTWVzc2FnZUhlYWRlciBvcGVyYXRpb25BbGxvd2VkPSJlZGl0Ij48VG90YWw+PE1vbmV5IGN1cnJlbmN5PSJVU0QiPjI5OS4wPC9Nb25leT48L1RvdGFsPjwvUHVuY2hPdXRPcmRlck1lc3NhZ2VIZWFkZXI+PEl0ZW1JbiBxdWFudGl0eT0iMSI+PEl0ZW1JRD48U3VwcGxpZXJQYXJ0SUQ+Mzg4MDUwMDwvU3VwcGxpZXJQYXJ0SUQ+PFN1cHBsaWVyUGFydEF1eGlsaWFyeUlEPjAwMDAwOTYxPC9TdXBwbGllclBhcnRBdXhpbGlhcnlJRD48L0l0ZW1JRD48SXRlbURldGFpbD48VW5pdFByaWNlPjxNb25leSBjdXJyZW5jeT0iVVNEIj4yOTkuMDwvTW9uZXk+PC9Vbml0UHJpY2U+PERlc2NyaXB0aW9uIHhtbDpsYW5nPSJlbiI+SW50ZWdyYXRlZCBjaGlzZWwgZnVuY3Rpb24gd2l0aCBWYXJpby1Mb2NrIOKAkyBmcmVlbHkgc2VsZWN0YWJsZSB3b3JrIHBvc2l0aW9uIG9mIHRoZSBjaGlzZWwmbHQ7YnIvJmd0O0Jvc2NoIFNEUy1wbHVzIHRvb2wgaG9sZGVyIOKAkyBmYXN0IGFuZCB0b29sLWZyZWUgYml0IGNoYW5naW5nIGFuZCBvcHRpbXVtIHBvd2VyIHRyYW5zZmVyJmx0O2JyLyZndDtJbXBhY3Qgc3RvcCBmb3IgZHJpbGxpbmcgaW4gbWV0YWwgYW5kIHdvb2QmbHQ7YnIvJmd0O0Jvc2NoIEVsZWN0cm9uaWMgc3BlZWQgY29udHJvbDogImFjY2VsZXJhdGUiIGZyb20gMCDigJMgbWF4LiB1c2luZyB0aGUgdHJpZ2dlciBzd2l0Y2g8L0Rlc2NyaXB0aW9uPjxVbml0T2ZNZWFzdXJlPkM2MjwvVW5pdE9mTWVhc3VyZT48Q2xhc3NpZmljYXRpb24gZG9tYWluPSJVTlNQU0MiPjIzMjkxNTAwPC9DbGFzc2lmaWNhdGlvbj48L0l0ZW1EZXRhaWw+PC9JdGVtSW4+PC9QdW5jaE91dE9yZGVyTWVzc2FnZT48L01lc3NhZ2U+PC9jWE1MPg=="
// }

export function createPunchoutRequisitionIntercept(
  mockResponse = mockPunchoutRequisition,
  alias = 'punchoutRequisition'
) {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/punchout/sessions/*/requisition`,
    },
    mockResponse
  ).as(alias);
}

export function openPunchoutSession(punchoutSession): any {
  return login(punchoutSession.customerId, punchoutSession.password)
    .then((result) => {
      expect(result.status).to.eq(200);
      cy.log('Logged in as Punchout user', JSON.stringify(result.body));
      setSessionData(result.body);
      punchoutSession.token.accessToken = result.body.access_token;
      createCart(result.body.access_token);
    })
    .then((cart) => {
      cy.log('Cart created', JSON.stringify(cart));
      punchoutSession.cartId = (cart as any).body.code;
      mockPunchoutSession.cartId = punchoutSession.cartId;
      createPunchoutSessionIntercept(punchoutSession);
      return login('carla.torres@rustic-hw.com', 'pw4all');
    })
    .then((result) => {
      expect(result.status).to.eq(200);
      cy.log('Logged in as Maria Torres', JSON.stringify(result.body));
      setSessionData(result.body);
      cy.intercept(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*/carts/${punchoutSession.cartId}?*`
      ).as('cartRequest');

      cy.visit(`/punchout/cxml/session?sid=abcd123`);
      // cy.wait(2000);
      cy.wait('@cartRequest')
        .its('request.headers')
        .should('have.property', 'punchoutsid');
      return cy.wrap({
        ...punchoutSession,
        token: { ...punchoutSession.token },
      });
    });
}

function goToPdpAndAddToCart(productId) {
  const pdpUrl = `/${Cypress.env('BASE_SITE')}/en/USD/product/${productId}`;
  cy.location('pathname').should('contain', pdpUrl);
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
}

export function goToPunchoutCart(productId) {
  goToPdpAndAddToCart(productId);

  cy.get('.cx-dialog-buttons').within(() => {
    cy.get('button').contains(' proceed to checkout ').should('not.be.visible');
    cy.get('button').contains(' view cart ').should('be.visible').click();
  });
  cy.location('pathname').should(
    'contain',
    `/${Cypress.env('BASE_SITE')}/en/USD/cart`
  );
  cy.get('cx-cart-proceed-to-checkout button').should('not.exist');
}

export function addProductAndClickCheckout(productId) {
  goToPdpAndAddToCart(productId);
  cy.get('.cx-dialog-buttons').within(() => {
    cy.get('button').contains(' proceed to checkout ').should('not.be.visible');
    cy.get('button')
      .contains(' proceed to checkout ')
      .invoke('css', 'display', 'block');
    cy.get('button').contains(' proceed to checkout ').click();
  });
}

export function verifyBackToAriba(discardCartEntries?: boolean) {
  cy.get('cx-global-message').should('contain', 'Return to Procurement System');
  cy.location('pathname').should(
    'contain',
    `/${Cypress.env('BASE_SITE')}/en/USD/punchout/cxml/requisition`
  );
  // if (discardCartEntries) {
  //   cy.wait('@punchoutRequisition')
  //     .its('request.headers')
  //     .should('have.property', 'discardCartEntries');
  // } else {
  //   cy.wait('@punchoutRequisition')
  //     .its('request.headers')
  //     .should('not.have.property', 'discardCartEntries');
  // }
}

export function deleteStaleCart(punchoutSession) {
  cy.log('Deleting stale cart with ID:', punchoutSession.cartId);
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}/users/current/carts/${punchoutSession.cartId}?lang=en&curr=USD`,
    headers: {
      Authorization: `Bearer ${punchoutSession.token.accessToken}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log('Stale cart deleted successfully');
  });
}
