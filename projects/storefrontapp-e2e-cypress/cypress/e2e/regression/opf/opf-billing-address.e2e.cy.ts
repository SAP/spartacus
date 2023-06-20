/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage } from '../../../helpers/checkout-flow';
import { fillShippingAddress } from '../../../helpers/checkout-forms';
import {
  changeLastNameOnPaymentForm,
  checkAddressForAllRequiredFields,
  fillPaymentAddress,
  mockPaymentAddress,
  proceedToCheckoutWithFirstProductFromSearch,
  verifyDeliveryMethod,
} from '../../../helpers/opf';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';

const user = getSampleUser();

describe('OPF billing address', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('billing address', () => {
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

      it('should show and hide payment form when click checkbox', () => {
        const checkbox = cy
          .get('cx-opf-checkout-billing-address-form')
          .find('input.form-check-input');

        checkbox.uncheck();

        cy.get('.cx-custom-address-info').should('not.exist');

        cy.get('cx-opf-checkout-billing-address-form')
          .find('cx-address-form')
          .should('exist');

        checkbox.check();

        cy.get('cx-opf-checkout-billing-address-form')
          .find('cx-address-form')
          .should('not.exist');

        cy.get('.cx-custom-address-info').should('exist');
      });

      it('should hide payment form when click cancel button', () => {
        const checkbox = cy
          .get('cx-opf-checkout-billing-address-form')
          .find('input.form-check-input');

        checkbox.uncheck();

        cy.get('.cx-address-form-btns').find('button.btn-secondary').click();

        cy.get('cx-opf-checkout-billing-address-form')
          .find('cx-address-form')
          .should('not.exist');

        cy.get('.cx-custom-address-info').should('exist');
      });

      it('should put shipping address as payment address when check checkbox again', () => {
        const checkbox = cy
          .get('cx-opf-checkout-billing-address-form')
          .find('input.form-check-input');

        cy.intercept(
          'PUT',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts/*/addresses/billing?lang=en&curr=USD`
        ).as('billing');

        checkbox.uncheck();
        checkbox.check();

        cy.get('@billing').then(() => {
          cy.get('cx-card')
            .find('.cx-card-label-container')
            .first()
            .should('contain', `${user.firstName} ${user.lastName}`);
        });
      });

      it('should show new payment address after save', () => {
        const checkbox = cy
          .get('cx-opf-checkout-billing-address-form')
          .find('input.form-check-input');

        cy.intercept(
          'PUT',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts/*/addresses/billing?lang=en&curr=USD`
        ).as('billing');

        checkbox.uncheck();

        fillPaymentAddress(mockPaymentAddress, true);

        cy.get('@billing').then(() => {
          checkAddressForAllRequiredFields(mockPaymentAddress);
        });
      });

      it('should uncheck the checkbox when new payment address was provided', () => {
        const checkbox = cy
          .get('cx-opf-checkout-billing-address-form')
          .find('input.form-check-input');

        cy.intercept(
          'PUT',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts/*/addresses/billing?lang=en&curr=USD`
        ).as('billing');

        checkbox.uncheck();

        fillPaymentAddress(mockPaymentAddress, true);

        cy.get('@billing').then(() => checkbox.should('not.be.checked'));
      });

      it('should open edit form when click edit button and show new value after save', () => {
        const checkbox = cy
          .get('cx-opf-checkout-billing-address-form')
          .find('input.form-check-input');

        cy.intercept(
          'PUT',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts/*/addresses/billing?lang=en&curr=USD`
        ).as('billing');

        checkbox.uncheck();

        fillPaymentAddress(mockPaymentAddress, true);

        const mockedLastName = 'Cypress';

        cy.get('@billing').then(() => {
          cy.get('.cx-custom-address-info').within(() => {
            cy.get('button').click();
          });

          changeLastNameOnPaymentForm(mockedLastName);

          cy.get('@billing').then(() => {
            cy.get('.cx-custom-address-info')
              .find('.cx-card-container')
              .within(() => {
                cy.get('.cx-card-label-bold').should('contain', mockedLastName);
              });
          });
        });
      });
    });
  });
});
