/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage } from '../../../helpers/checkout-flow';
import { fillShippingAddress } from '../../../helpers/checkout-forms';
import {
  proceedToCheckoutWithFirstProductFromSearch,
  verifyDeliveryMethod,
} from '../../../helpers/opf';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';

const user = getSampleUser();

describe('OPF payment options', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('payment options', () => {
      beforeEach(() => {
        cy.requireLoggedIn();
        cy.visit('/');

        proceedToCheckoutWithFirstProductFromSearch();

        const deliveryModePage = waitForPage(
          '/checkout/delivery-mode',
          'getDeliveryModePage'
        );

        fillShippingAddress(user);

        cy.wait(`@${deliveryModePage}`)
          .its('response.statusCode')
          .should('eq', 200);

        verifyDeliveryMethod();
      });

      it('should show disabled payment option after entering payment tab', () => {
        const paymentOptionsContainer = cy
          .get('cx-opf-checkout-payment-and-review')
          .find('cx-opf-checkout-payments');

        paymentOptionsContainer.should('exist');

        cy.get('.cx-payment-options-list')
          .first()
          .find('input.form-check-input')
          .should('be.disabled');
      });

      it('should show enabled payment option after accepting terms and conditions and disable it after the checkbox being unchecked', () => {
        const checkbox = cy
          .get('.cx-opf-terms-and-conditions')
          .find('input.form-check-input');

        checkbox.check();

        cy.get('.cx-payment-options-list')
          .first()
          .find('input.form-check-input')
          .should('not.be.disabled');

        checkbox.uncheck();

        cy.get('.cx-payment-options-list')
          .first()
          .find('input.form-check-input')
          .should('be.disabled');
      });

      it('should show payment wrapper after selecting payment method', () => {
        const termsAndConditionsCheckbox = cy
          .get('.cx-opf-terms-and-conditions')
          .find('input.form-check-input');

        termsAndConditionsCheckbox.check();

        cy.intercept(
          'POST',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/payments`
        ).as('payments');

        cy.get('.cx-payment-options-list input[type="radio"]').first().check();

        cy.get('@payments').then(() => {
          cy.get('cx-opf-checkout-payment-wrapper').should('exist');
        });
      });

      it('should hide payment wrapper after terms and conditions uncheck', () => {
        const termsAndConditionsCheckbox = cy
          .get('.cx-opf-terms-and-conditions')
          .find('input.form-check-input');

        termsAndConditionsCheckbox.check();

        cy.intercept(
          'POST',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/payments`
        ).as('payments');

        cy.get('.cx-payment-options-list input[type="radio"]').first().check();

        cy.get('@payments').then(() => {
          termsAndConditionsCheckbox.uncheck();

          cy.get('cx-opf-checkout-payment-wrapper').should('not.exist');
        });
      });
    });
  });
});
