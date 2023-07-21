/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  b2bDeliveryAddress,
  b2bDeliveryModeStub,
} from '../../../sample-data/b2b-checkout';
import { interceptGet } from '../../../support/utils/intercept';
import { tabbingOrderConfig } from '../../accessibility/b2b/tabbing-order.config';
import { verifyTabbingOrder } from '../../accessibility/tabbing-order';
import {
  TabbingOrderConfig,
  TabbingOrderTypes,
} from '../../accessibility/tabbing-order.model';
import {
  interceptCheckoutB2BDetailsEndpoint,
  interceptPutDeliveryModeEndpoint,
} from '../../b2b/b2b-checkout';
import { waitForPage } from '../../checkout-flow';
import * as alerts from '../../global-message';

export const poNumber = '777';

export const rddDeliveryModeTabbingConfig: TabbingOrderConfig = {
  ...tabbingOrderConfig,
  deliveryMode: [
    { value: 'Method ofPayment', type: TabbingOrderTypes.LINK },
    { value: 'ShippingAddress', type: TabbingOrderTypes.LINK },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'deliveryModeId', type: TabbingOrderTypes.RADIO },
    { value: 'requestedDeliveryDate', type: TabbingOrderTypes.GENERIC_INPUT },
    { value: 'Back', type: TabbingOrderTypes.BUTTON },
    { value: 'Continue', type: TabbingOrderTypes.BUTTON },
  ],
};

export function selectAccountDeliveryMode() {
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint(
    b2bDeliveryModeStub,
    b2bDeliveryAddress.id
  );
  const putDeliveryMode = interceptPutDeliveryModeEndpoint();

  interceptGet(
    'cart_refresh',
    '/users/*/carts/*?fields=DEFAULT,potentialProductPromotions*'
  );

  cy.get('.cx-checkout-title').should('contain', 'Delivery Method');
  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);
  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('cx-delivery-mode input').eq(1).click();

  cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-delivery-mode input').first().should('not.be.checked');

  cy.get('input[type=radio][formcontrolname=deliveryModeId]').should(
    'not.be.disabled'
  );
  cy.get(
    'input[type=radio][formcontrolname=deliveryModeId]:not(:disabled)'
  ).then(() => {
    // Accessibility
    verifyTabbingOrder(
      'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
      rddDeliveryModeTabbingConfig.deliveryMode
    );
  });
  cy.wait(`@cart_refresh`).then((xhr) => {
    expect(xhr.request.method).to.eq('GET');
    expect(xhr.response.statusCode).to.eq(200);
    if (xhr && xhr.response && xhr.response.body) {
      if (!xhr.response.body.requestedRetrievalAt) {
        const alert = alerts.getAlert();
        alert.should('contain', 'Delivery Date updated successfully.');
        cy.get('cx-global-message .alert', { timeout: 5000 }).should(
          'not.exist'
        );
      }
    }
  });

  verifyRDDDatePickerExists();
}

export function verifyRDDDatePickerExists() {
  cy.get('cx-request-delivery-date').should('exist');
  cy.get('cx-request-delivery-date').within(() => {
    cy.get('cx-date-picker').should('exist');
    cy.get('input[type="date"]', { timeout: 3000 }).should('not.be.disabled');
  });
}

export function updateRequestedDeliveryDate(date: string) {
  interceptPutRequestedRetrievalAtEndpoint();
  cy.get('cx-date-picker').within(() => {
    cy.get('input[type="date"]', { timeout: 3000 })
      .should('not.be.disabled')
      .type(date)
      .trigger('update');
  });
}

export function verifyDeliveryDateErrorMessage() {
  cy.wait(`@putRetrievalAt`).its('response.statusCode').should('eq', 400);
  //verify error message is shown.
  const alert = alerts.getErrorAlert();
  alert.should(
    'contain',
    'Something went wrong. Unable to update the requested date.'
  );
}

export function verifyDeliveryDateInfoMessage() {
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint(
    b2bDeliveryModeStub,
    b2bDeliveryAddress.id
  );

  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(`@putRetrievalAt`).its('response.statusCode').should('eq', 200);
  //verify info message is shown.
  const alert = alerts.getAlert();
  alert.should('contain', 'Delivery Date updated successfully.');
}

export function proceedToOrderReviewPage() {
  const orderReview = waitForPage('/checkout/review-order', 'getReviewOrder');
  cy.get('button.btn-primary').should('be.enabled').click();
  cy.wait(`@${orderReview}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function verifyRDDOrderReviewPage(date: string) {
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Delivery Method')
    .get('cx-request-delivery-date')
    .within(() => {
      cy.findByText('Requested Delivery Date');
      cy.findByText(date);
    });
}

export function editDeliveryMethodOrderReviewPage() {
  cy.get('.cx-review-card-shipping > .cx-review-summary-edit-step > a').click();
  verifyRDDDatePickerExists();
}

export function verifyRDDOrderDetailPage(date: string) {
  cy.get('cx-order-overview-delivery-date').should('exist');
  cy.get('cx-order-overview-delivery-date').within(() => {
    cy.findByText('Requested Delivery Date');
    cy.findByText(date);
  });
}

export function interceptPutRequestedRetrievalAtEndpoint() {
  cy.intercept({
    method: 'PUT',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/requestedretrievaldate?requestedRetrievalAt=*`,
  }).as('putRetrievalAt');
}
