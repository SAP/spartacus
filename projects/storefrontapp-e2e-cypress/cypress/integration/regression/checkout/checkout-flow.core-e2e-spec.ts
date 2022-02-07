import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  filterUsingFacetFiltering,
  searchResult,
} from '../../../helpers/product-search';
import { getSampleUser } from '../../../sample-data/checkout-flow';

import { AddressData, PaymentDetails } from '../../../helpers/checkout-forms';

context('Checkout flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.fillAddressFormWithCheapProduct(user);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user);
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });

    it('should filter with faceting and perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      searchResult();
      filterUsingFacetFiltering();

      cy.intercept(
        'POST',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/*/carts/*/entries?lang=en&curr=USD`
      ).as('addToCart');

      cy.intercept(
        'POST',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts?fields*`
      ).as('carts');

      checkout.addFirstResultToCartFromSearchAndLogin(user);

      cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
      cy.wait('@carts').its('response.statusCode').should('eq', 201);

      cy.get('@carts').then((xhr: any) => {
        const cartData = { total: xhr.response.body.totalPrice.formattedValue };
        const code = xhr.response.body.code;

        checkout.fillAddressFormWithCheapProduct(user as AddressData, cartData);

        cy.intercept(
          'GET',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts/${code}?fields=DEFAULT*`
        ).as('userCart');
      });

      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user as PaymentDetails);

      cy.wait('@userCart').its('response.statusCode').should('eq', 200);

      cy.get('@userCart').then((xhr: any) => {
        const cart = xhr.response.body;
        const cartData = {
          total: cart.subTotal.formattedValue,
          estimatedShipping: cart.deliveryCost.formattedValue,
        };
        checkout.placeOrderWithCheapProduct(user, cartData);
      });

      cy.get('@addToCart').then((xhr: any) => {
        const responseProduct = xhr.response.body.entry.product;
        const sampleProduct = { code: responseProduct.code };
        checkout.verifyOrderConfirmationPageWithCheapProduct(
          user,
          sampleProduct
        );
      });
    });
  });
});
