/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  POWERTOOLS_BASESITE,
  b2bDeliveryAddress,
} from '../../../sample-data/b2b-checkout';
import { SampleProduct } from '../../../sample-data/checkout-flow';
import { verifyTabbingOrder } from '../../accessibility/tabbing-order';
import {
  interceptCheckoutB2BDetailsEndpoint,
  interceptCostCenterEndpoint,
  interceptPaymentTypesEndpoint,
  interceptPutDeliveryModeEndpoint,
} from '../../b2b/b2b-checkout';
import {
  waitForProductPage,
  addCheapProductToCart,
  waitForPage,
  verifyReviewOrderPage,
} from '../../checkout-flow';
import { tabbingOrderConfig as config } from '../../../helpers/accessibility/b2b/tabbing-order.config';
import { ORDER_CODE } from '../../../sample-data/service-order';

export const serviceUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  firstName: 'James',
  lastName: 'Weber',
  titleCode: 'mr',
};

export const serviceProduct: SampleProduct = {
  code: 'SRV_01',
  name: 'SRV_01',
};

export const nonServiceProduct: SampleProduct = {
  name: 'D10VC2',
  code: '3887119',
};

export function checkoutForServiceOrder(product: SampleProduct) {
  const productPage = waitForProductPage(product.code, 'getProductPage');
  const getPaymentTypes = interceptPaymentTypesEndpoint();

  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${product.code}`);
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });

  addCheapProductToCart(product);

  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${getPaymentTypes}`).its('response.statusCode').should('eq', 200);
}

export function selectAccountDeliveryModeForServiceOrder() {
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint();

  cy.get('.cx-checkout-title').should('contain', 'Delivery Options');
  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });
  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);

  const serviceDetails = waitForPage(
    '/checkout/service-details',
    'getServiceDetails'
  );
  cy.wait(`@${serviceDetails}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function verifyServiceDatePickerExists() {
  cy.get('cx-service-details')
    .should('exist')
    .within(() => {
      cy.get('cx-date-picker').should('exist');
      cy.get('input[type="date"]', { timeout: 3000 }).should('not.be.disabled');
    });
}

export function interceptPatchServiceDetailsEndpoint() {
  const alias = 'patchServiceDetails';
  cy.intercept('PATCH', '**/serviceOrder/serviceScheduleSlot**').as(alias);
  return alias;
}

export function selectServiceDetailsForServiceOrder() {
  const patchServiceDetails = interceptPatchServiceDetailsEndpoint();
  const orderReview = waitForPage('/checkout/review-order', 'getReviewOrder');
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint();

  cy.get('.cx-checkout-title').should(
    'contain',
    'Service Schedule - Date and Time'
  );

  verifyServiceDatePickerExists();
  cy.get('select[formcontrolname="scheduleTime"]')
    .should('exist')
    .and('not.be.empty');
  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });
  cy.wait(`@${patchServiceDetails}`)
    .its('response.statusCode')
    .should('eq', 200);
  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(`@${orderReview}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function verifyServiceOrderReviewOrderPage(serviceOrder: boolean) {
  verifyReviewOrderPage();

  if (serviceOrder) {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText('Scheduled At');
      });
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container .cx-card-label')
      .should((div) => {
        const text = div.text().trim();
        expect(text).to.match(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/);
      });
  } else {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container')
      .should('not.exist');
  }

  cy.findByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      `/${Cypress.env('BASE_SITE')}/en/USD/terms-and-conditions`
    );
  cy.get('input[formcontrolname="termsAndConditions"]').check();
}

export function verifyServiceOrderConfirmationPage(serviceOrder: boolean) {
  if (serviceOrder) {
    cy.get('cx-card-service-details')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText('Scheduled At');
      });
    cy.get('cx-card-service-details .cx-card-label').should((div) => {
      const text = div.text().trim();
      expect(text).to.match(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/);
    });
  } else {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container')
      .should('not.exist');
  }
}

export function selectAccountPaymentForServiceOrder() {
  const getCostCenters = interceptCostCenterEndpoint();

  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click({ force: true });
  });

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/current/carts/*?fields=DEFAULT*`
  ).as('getCart');
  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryPage'
  );
  cy.get('button.btn-primary').should('be.enabled').click({ force: true });
  cy.wait(`@${deliveryAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(`@${getCostCenters}`).then((xhr) => {
    if (
      !b2bDeliveryAddress.id &&
      xhr?.response?.body?.costCenters[0]?.unit?.addresses[0]?.id
    ) {
      b2bDeliveryAddress.id =
        xhr.response.body.costCenters[0].unit.addresses[0].id;
    }
  });
}

export function selectAccountShippingAddressForServiceOrder() {
  const putDeliveryMode = interceptPutDeliveryModeEndpoint();

  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
  });

  cy.get('cx-card .card-header').should('contain', 'Selected');

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );

  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    config.shippingAddressAccount
  );

  cy.get('button.btn-primary').should('be.enabled').click();
  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);
}

export function interceptOrderList(alias, response) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders?*`,
    { statusCode: 200, body: response }
  ).as(alias);
}

export function interceptOrderDetails(alias, response) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}?*`,
    { statusCode: 200, body: response }
  ).as(alias);
}

export function interceptRescheduleServiceOrder(alias) {
  cy.intercept(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}/serviceOrder/serviceScheduleSlot?*`,
    { statusCode: 200 }
  ).as(alias);
}
