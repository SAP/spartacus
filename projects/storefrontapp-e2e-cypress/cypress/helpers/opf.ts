/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SampleProduct } from '../sample-data/checkout-flow';
import { interceptGet } from '../support/utils/intercept';
import { waitForPage } from './checkout-flow';
import { AddressData } from './checkout-forms';
import { searchForProduct } from './product-search';

export const product: SampleProduct = {
  name: 'Alpha 350',
  code: '1446509',
};

export const mockPaymentAddress = {
  titleCode: 'Mr',
  firstName: 'Test',
  lastName: 'Address',
  fullName: 'Test Address',
  password: '123.',
  email: 'test@mail.com',
  phone: '123 456 789',
  cellphone: '987 654 321',
  address: {
    city: 'Miami-Beach',
    line1: 'Collins Ave',
    line2: '8616 Surfside',
    country: 'United States',
    state: 'Florida',
    postal: '33254',
  },
  payment: {
    card: 'Visa',
    number: '4111111111111111',
    expires: {
      month: '10',
      year: '2028',
    },
    cvv: '123',
  },
};

export function verifyDeliveryMethod() {
  cy.log('🛒 Selecting delivery method');

  cy.get('.cx-checkout-title').should('contain', 'Delivery Method');

  cy.get('cx-delivery-mode input').first().should('be.checked');

  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');
  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });
  cy.wait(`@${reviewPage}`).its('response.statusCode').should('eq', 200);
}

export function proceedToCheckoutWithFirstProductFromSearch() {
  searchForProduct(product.name);
  interceptGet(
    'cart_refresh',
    '/users/*/carts/*?fields=DEFAULT,potentialProductPromotions*'
  );
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
  cy.wait(`@cart_refresh`);

  cy.findByText(/proceed to checkout/i).click();
}

export function fillPaymentAddress(
  address: Partial<AddressData>,
  submitForm: boolean = true
) {
  cy.wait(3000);
  cy.get('button.btn-primary').should('be.visible');
  cy.get('cx-address-form').within(() => {
    if (address) {
      address?.address?.country &&
        cy
          .get('.country-select[formcontrolname="isocode"]')
          .ngSelect(address.address.country);
      cy.get('[formcontrolname="titleCode"]').ngSelect('Mr');
      address?.firstName &&
        cy.get('[formcontrolname="firstName"]').clear().type(address.firstName);

      address?.lastName &&
        cy.get('[formcontrolname="lastName"]').clear().type(address.lastName);
      address?.address?.line1 &&
        cy.get('[formcontrolname="line1"]').clear().type(address.address.line1);
      address?.address?.line2 &&
        cy.get('[formcontrolname="line2"]').clear().type(address.address.line2);
      address?.address?.city &&
        cy.get('[formcontrolname="town"]').clear().type(address.address.city);
      address?.address?.state &&
        cy
          .get('.region-select[formcontrolname="isocode"]')
          .ngSelect(address.address.state);
      address?.address?.postal &&
        cy
          .get('[formcontrolname="postalCode"]')
          .clear()
          .type(address.address.postal);
      address?.phone &&
        cy.get('[formcontrolname="phone"]').clear().type(address.phone);
    }
    if (submitForm) {
      cy.get('button.btn-primary').click();
    }
  });
}

export function checkAddressForAllRequiredFields(
  address: Partial<AddressData>
) {
  cy.get('.cx-custom-address-info')
    .find('.cx-card-container')
    .within(() => {
      cy.get('.cx-card-label-bold').should(
        'contain',
        `${address.firstName} ${address.lastName}`
      );
      cy.get('.cx-card-label').eq(0).should('contain', address.address.line1);
      cy.get('.cx-card-label').eq(1).should('contain', address.address.line2);
      cy.get('.cx-card-label')
        .eq(2)
        .should('contain', `${address.address.city}, US-FL, US`);
      cy.get('.cx-card-label').eq(3).should('contain', address.address.postal);
      cy.get('.cx-card-label').eq(4).should('contain', address.phone);
    });
}

export function changeLastNameOnPaymentForm(lastName: string) {
  cy.get('cx-opf-checkout-billing-address-form')
    .find('cx-address-form')
    .should('exist')
    .within(() => {
      cy.get('[formcontrolname="lastName"]').clear().type(lastName);
      cy.get('button.btn-primary').click();
    });
}
