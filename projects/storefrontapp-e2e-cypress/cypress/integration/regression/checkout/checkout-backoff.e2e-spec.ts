import {
  visitCartPage,
  waitForCartPageData,
} from '../../../helpers/b2b/b2b-saved-cart';
import * as checkoutBackoff from '../../../helpers/checkout-backoff';
import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Checkout backoff test', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      clearAllStorage();
    });

    beforeEach(() => {
      cy.requireLoggedIn();
      waitForCartPageData(sampleData.product);
      visitCartPage();

      checkoutBackoff.waitForShippingAddressdata();
      checkoutBackoff.visitCheckoutShippingAddressPage();
    });

    it('should verify backoff mechanism in checkout', () => {
      // intercept for route
      cy.intercept(
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)&lang=en&curr=USD`,
        { times: 1 },
        (req) => {
          req.reply({
            statusCode: 400,
            body: { details: [{ type: 'JaloObjectNoLongerValidError' }] },
          });
        }
      ).as('test1err');

      cy.intercept(
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)&lang=en&curr=USD`,
        { times: 1 },
        (req) => {
          req.reply({
            statusCode: 400,
            body: { details: [{ type: 'JaloObjectNoLongerValidError' }] },
            delay: 300,
          });
        }
      ).as('test2err');

      cy.intercept(
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)&lang=en&curr=USD`,
        { times: 1 },
        (req) => {
          req.reply({
            statusCode: 400,
            body: { details: [{ type: 'JaloObjectNoLongerValidError' }] },
            delay: 1200,
          });
        }
      ).as('test3err');

      cy.intercept(
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)&lang=en&curr=USD`,
        { times: 1 },
        (req) => {
          req.reply({
            statusCode: 400,
            body: { details: [{ type: 'JaloObjectNoLongerValidError' }] },
            delay: 1200,
          });
        }
      ).as('test4err');

      // cy.intercept(
      //   `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      //     'BASE_SITE'
      //   )}/users/current/carts/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)&lang=en&curr=USD`,
      //   { delay: 5000 }
      // ).as('test3successhopefully');

      // click the card (can reproduce easily in the storefront)
      cy.get('cx-shipping-address .cx-card-actions .cx-card-link').click({
        force: true,
      });

      // do the 3 assert test (fail, fail, pass)
      cy.wait(`@test1err`).its('response.statusCode').should('eq', 400);

      cy.wait(`@test2err`).its('response.statusCode').should('eq', 400);
      cy.wait(`@test3err`).its('response.statusCode').should('eq', 400);
      cy.wait(`@test4err`).its('response.statusCode').should('eq', 400);
      // cy.wait(`@test3successhopefully`)
      //   .its('response.statusCode')
      //   .should('eq', 200);
    });
  });
});
