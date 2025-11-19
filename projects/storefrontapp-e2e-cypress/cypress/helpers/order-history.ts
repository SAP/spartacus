/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { product, SampleUser, user } from '../sample-data/checkout-flow';
import { login } from './auth-forms';
import { waitForPage } from './navigation';
import { mockOrderList, USE_ORDER_HISTORY_MOCKS } from './orders-history-mocks';

const orderHistoryLink = '/my-account/orders';
export const CART_PAGE_ALIAS = 'cartPage';
export const ADD_TO_CART_ENDPOINT_ALIAS = 'addToCart';
export const ORDERS_ALIAS = 'orders';
export const CART_FROM_ORDER_ALIAS = 'cartFromOrder';


export function doPlaceOrder(productData?: any) {
  let stateAuth: any;

  return cy
    .window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      stateAuth = token;
      return cy.requireProductAddedToCart(stateAuth, productData);
    })
    .then(({ cartId }) => {
      cy.requireDeliveryAddressAdded(user.address, stateAuth, cartId);
      cy.requireDeliveryMethodSelected(stateAuth, cartId);
      cy.requirePaymentDone(stateAuth, cartId);

      return cy.requirePlacedOrder(stateAuth, cartId);
    });
}

export function interceptCartPageEndpoint() {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?pageType=ContentPage&pageLabelOrId=%2Fcart&lang=en&curr=USD`
  ).as(CART_PAGE_ALIAS);

  return CART_PAGE_ALIAS;
}

export function verifyActionLinkHasText(text: string) {
  cy.get('.cx-item-list-row .btn-tertiary').should('contain', text);
}

export function clickOnActionLink() {
  cy.get('.cx-item-list-row .btn-tertiary').click();
}

export function waitForResponse(alias: string) {
  cy.wait(`@${alias}`);
}

export function interceptAddToCartEndpoint() {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/${Cypress.env(
      'OCC_PREFIX_USER_ENDPOINT'
    )}/*/carts/*/entries*`
  ).as(ADD_TO_CART_ENDPOINT_ALIAS);

  return ADD_TO_CART_ENDPOINT_ALIAS;
}

export function interceptOrdersEndpoint(): string {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders?*`
  ).as(ORDERS_ALIAS);

  return ORDERS_ALIAS;
}

export function interceptCartFromOrderEndpoint(): string {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/current/cartFromOrder?*`
  ).as(CART_FROM_ORDER_ALIAS);

  return CART_FROM_ORDER_ALIAS;
}

export const orderHistoryTest = {
  // no orders flow
  checkRedirectNotLoggedInUser(url: string = orderHistoryLink) {
    it('should redirect to login page if user is not logged in', () => {
      cy.visit(url);
      cy.url().should('contain', '/login');
      cy.getLoginRegisterLink().should('contain', 'Sign In / Register');
    });
  },
  checkRedirectLoggedInUser(
    sampleUser: SampleUser = user,
    url: string = orderHistoryLink
  ) {
    it('should go to Order History once user has logged in', () => {
      cy.visit(url);
      cy.url().should('contain', '/login');
      cy.getLoginRegisterLink().should('contain', 'Sign In / Register');
      login(sampleUser.email, sampleUser.password);
      cy.url().should('contain', url);
    });
  },
  checkIfOrderIsDisplayed() {
    it('should display placed order in Order History', () => {
      if (USE_ORDER_HISTORY_MOCKS) {
        const mock = {
          code: 'MOCK12345',
          created: '2025-01-01T10:00:00',
          statusDisplay: 'COMPLETED',
          totalPrice: { formattedValue: '$999.00' },
          orgCustomer: null,
          guid: 'mock-guid',
        };

        mockOrderList(mock);

        cy.visit('/my-account/orders');
        cy.wait('@mockOrders');

        cy.get('.cx-order-history-code > .cx-order-history-value').should(
          'contain',
          mock.code
        );
      } else {
        doPlaceOrder().then((firstOrder: any) => {
          doPlaceOrder().then((secondOrder: any) => {
            cy.waitForOrderToBePlacedRequest(
              undefined,
              undefined,
              secondOrder.body.code
            );

            cy.visit('/my-account/orders');

            cy.get('.cx-order-history-code > .cx-order-history-value').should(
              'contain',
              secondOrder.body.code
            );
          });
        });
      }
    });
  },

  checkSortingByCode() {
    it('should sort orders by code', () => {
      if (USE_ORDER_HISTORY_MOCKS) {
        mockOrderList({
          code: 'MOCKSORT',
          created: '2025-01-01',
          statusDisplay: 'COMPLETED',
          totalPrice: { formattedValue: '$10' },
          orgCustomer: null,
          guid: 'a',
        });

        cy.visit('/my-account/orders');
        cy.wait('@mockOrders');
        return;
      }

      const ordersAlias = interceptOrdersEndpoint();
      cy.visit('/my-account/orders');
      cy.wait(`@${ordersAlias}`);
    });
  },
  checkCorrectDateFormat() {
    it('should show correct date format', () => {
      if (USE_ORDER_HISTORY_MOCKS) {
        mockOrderList({
          code: 'DATE1',
          created: '2025-01-10T10:00:00',
          statusDisplay: 'COMPLETED',
          totalPrice: { formattedValue: '$10' },
          orgCustomer: null,
          guid: 'u',
        });

        cy.visit('/my-account/orders');
        cy.wait('@mockOrders');
        return;
      }

      cy.intercept('GET', /users\/current\/orders/).as('getOrderHistoryPage');
      cy.visit('/my-account/orders');
      cy.wait('@getOrderHistoryPage');
    });
  },
  checkOrderDetailsUnconsignedEntries() {
    it('should display order details page with unconsigned entries', () => {
      doPlaceOrder().then((orderData: any) => {
        cy.visit(`/my-account/order/${orderData.body.code}`);
        cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
        cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
        cy.get('.cx-summary-total > .cx-summary-amount').should(
          'contain',
          orderData.body.totalPrice.formattedValue
        );
      });
    });
  },
  checkTabsAreDisplayedAfterNavigation() {
    it('should display order history tabs after navigation', () => {
      if (USE_ORDER_HISTORY_MOCKS) {
        mockOrderList({
          code: 'TABMOCK1',
          created: '2025-01-01',
          statusDisplay: 'COMPLETED',
          totalPrice: { formattedValue: '$10' },
          orgCustomer: null,
          guid: 'z',
        });

        cy.visit('/my-account/orders');
        cy.wait('@mockOrders');
        cy.get('cx-order-history h2').should('contain', 'Order history');
        return;
      }

      cy.visit('/my-account/orders');
      cy.get('cx-order-history h2').should('contain', 'Order history');
    });
  },
};

export function goToOrderDetails() {
  cy.visit('/my-account/orders');

  if (USE_ORDER_HISTORY_MOCKS) {
    cy.get('.cx-order-history-value').first().click();
    return;
  }

  const ordersAlias = interceptOrdersEndpoint();
  waitForResponse(ordersAlias);

  const orderDetailsPage = waitForPage(
    '/my-account/order/*',
    'getOrderDetails'
  );
  cy.get('.cx-order-history-value').first().click();
  cy.wait(`@${orderDetailsPage}`);
}

export function saveOrderDetails() {
  cy.get('tr.cx-item-list-row').each(($row, index, list) => {
    if (index === 0) {
      cy.wrap(list.length).as('totalOrderHistoryListItems');
    }
    cy.wrap($row)
      .find('.cx-code')
      .then((code) => {
        const itemCode = Cypress.$(code).html();
        cy.wrap(itemCode).as(`itemCode${index}`);
      });
    cy.wrap($row)
      .find('cx-item-counter input')
      .then((input) => {
        const inputValue = Cypress.$(input).val();
        cy.wrap(inputValue).as(`quantityItem${index}`);
      });
  });
}
