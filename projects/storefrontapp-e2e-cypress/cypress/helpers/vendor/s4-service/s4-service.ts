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

export function addProductToCart(product: SampleProduct) {
  const productPage = waitForProductPage(product.code, 'getProductPage');
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${product.code}`);
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  addCheapProductToCart(product);
}

export function proceedToCheckout() {
  const getPaymentTypes = interceptPaymentTypesEndpoint();
  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${getPaymentTypes}`).its('response.statusCode').should('eq', 200);
}

export function selectDeliveryMode(checkServiceDetails: boolean) {
  const getCheckoutDetailsAfterDeliveryMode =
    interceptCheckoutB2BDetailsEndpoint();
  const serviceDetails = waitForPage(
    '/checkout/service-details',
    'getServiceDetails'
  );
  cy.get('.cx-checkout-title').should('contain', 'Delivery Options');
  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });
  cy.wait(`@${getCheckoutDetailsAfterDeliveryMode}`)
    .its('response.statusCode')
    .should('eq', 200);

  if (checkServiceDetails) {
    cy.wait(`@${serviceDetails}`, { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);
  }
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

export function selectServiceDetails() {
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

export function verifyOrderReviewPage(
  shouldServiceDetailsBeVisible: boolean,
  shouldDeliveryModeBeVisible: boolean
) {
  if (shouldServiceDetailsBeVisible) {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container')
      .should('exist');
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container .cx-card-label')
      .should((div) => {
        const text = div.text().trim();
        expect(text).to.match(/\d{2}:\d{2}:\d{2}/);
      });
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container .cx-card-label-bold')
      .should((div) => {
        const text = div.text().trim();
        expect(text).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
      });
  } else {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Service Details')
      .should('not.exist');
  }

  if (shouldDeliveryModeBeVisible === true) {
    cy.contains('.cx-review-summary-card', 'Delivery Method').should('exist');
  } else {
    cy.contains('.cx-review-summary-card', 'Delivery Method').should(
      'not.exist'
    );
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

export function verifyOrderConfirmationPage(
  shouldServiceDetailsBeVisible: boolean,
  shouldDeliveryModeBeVisible: boolean
) {
  if (shouldServiceDetailsBeVisible) {
    cy.get('cx-card-service-details')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container')
      .should('exist');
    cy.get('cx-card-service-details')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container .cx-card-label')
      .should((div) => {
        const text = div.text().trim();
        expect(text).to.match(/\d{2}:\d{2}:\d{2}/);
      });
    cy.get('cx-card-service-details')
      .contains('cx-card', 'Service Details')
      .find('.cx-card-container .cx-card-label-bold')
      .should((div) => {
        const text = div.text().trim();
        expect(text).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
      });
  } else {
    cy.get('cx-card-service-details')
      .contains('cx-card', 'Service Details')
      .should('not.exist');
  }
  if (shouldDeliveryModeBeVisible === true) {
    cy.contains('cx-card', 'Shipping Method').should('exist');
  } else {
    cy.contains('cx-card', 'Shipping Method').should('not.exist');
  }
}

export function selectAccountPayment() {
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

export function selectShippingAddress(checkDeliveryMode: boolean) {
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
  if (checkDeliveryMode === true) {
    cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
    cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);
  }
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
