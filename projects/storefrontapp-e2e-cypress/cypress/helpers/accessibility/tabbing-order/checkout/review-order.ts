/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyReviewOrderPage, waitForPage } from '../../../checkout-flow';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutReviewOrderTabbingOrder(
  config: TabElement[],
  checkout: boolean = false
) {
  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');

  cy.visit('/checkout/review-order');

  cy.wait(`@${reviewPage}`);

  verifyReviewOrderPage();

  cy.findAllByText(/I am confirming that I have read and agreed with/i)
    .first()
    .parent()
    .within(() => {
      cy.get('input').click();
    });

  verifyTabbingOrder(containerSelector, config);

  if (checkout) {
    const orderConfirmationPage = waitForPage(
      '/order-confirmation',
      'getOrderConfirmationPage'
    );
    cy.get('cx-place-order button.btn-primary').click();
    cy.wait(`@${orderConfirmationPage}`)
      .its('response.statusCode')
      .should('eq', 200);
  }
}
