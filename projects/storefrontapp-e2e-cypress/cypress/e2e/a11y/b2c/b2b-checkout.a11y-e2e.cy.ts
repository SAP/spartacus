import { loginB2bUser } from './helpers/a11y-b2b.checkout';
import {
  fillPaymentDetails,
  fillShippingAddress,
} from '../../helpers/checkout-forms';
import { user } from '../../sample-data/checkout-flow';
import * as b2bCheckout from '../../helpers/b2b/b2b-checkout';
import { products } from '../../sample-data/b2b-checkout';
import { viewportContext } from '../../helpers/viewport-context';

function proceedToCheckout(): void {
  cy.visit(`product/${products[0].code}`);
  cy.get('button').contains(' Add to cart ').click();
  cy.get('.cx-dialog-buttons button').contains(' view cart ').click();
  cy.get('cx-cart-details');
  cy.get('main').a11yRunContinuumTest();
  cy.get('button').contains(' Proceed to Checkout ').click();
}

describe('B2B checkout accessibility', { testIsolation: false }, () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.a11yContinuumSetup();
      loginB2bUser();
    });

    describe('Checkout with account', () => {
      it('Payment Type', () => {
        proceedToCheckout();
        cy.get('cx-payment-type').within(() => {
          cy.findByText('Account').click();
        });
        cy.get('cx-payment-type button').contains(' Continue ');
        cy.get('main').a11yRunContinuumTest();
      });

      it('Delivery address', () => {
        cy.get('cx-payment-type button').contains(' Continue ').click();

        cy.get('.cx-delivery-address-card');
        cy.get('main').a11yRunContinuumTest();
      });

      it('Delivery mode', () => {
        cy.get('cx-delivery-address button.btn-primary')
          .contains(' Continue ')
          .click();

        cy.get('cx-delivery-mode input');
        cy.get('main').a11yRunContinuumTest();
      });

      it('Review', () => {
        cy.get('cx-delivery-mode button.btn-primary')
          .contains(' Continue ')
          .click();

        cy.get('input[formcontrolname="termsAndConditions"]');
        cy.get('main').a11yRunContinuumTest();
      });

      it('Order Confirmation', () => {
        cy.get('input[formcontrolname="termsAndConditions"]').check();
        cy.get('cx-place-order button').contains(' Place Order ').click();

        cy.get('cx-order-confirmation-thank-you-message');
        cy.get('main').a11yRunContinuumTest();
      });
    });

    describe('Checkout With Card', () => {
      it('Payment Type', () => {
        proceedToCheckout();
        b2bCheckout.enterPONumber();
        cy.get('cx-payment-type').within(() => {
          cy.findByText('Credit Card').click();
        });
        cy.get('cx-payment-type button').contains(' Continue ').click();
      });

      it('Shipping Address', () => {
        cy.get('.cx-address-form-btns button').contains(' Continue ').click();
        cy.get('cx-delivery-address').a11yRunContinuumTest();
        fillShippingAddress(user, false);
        cy.get('cx-delivery-address').a11yRunContinuumTest();
        cy.get('cx-delivery-address button.btn-primary')
          .contains(' Continue ')
          .click();
        cy.get('cx-global-message').a11yRunContinuumTest();

        // skipping delivery mode since it's been tested in previous suite
        cy.get('cx-delivery-mode button.btn-primary')
          .contains(' Continue ')
          .click();
      });

      it('Payment Type', () => {
        cy.get('cx-payment-method button').contains(' Continue ').click();
        cy.get('cx-payment-method').a11yRunContinuumTest();
        fillPaymentDetails(user, undefined, false);
        cy.get('cx-payment-method').a11yRunContinuumTest();
        cy.get('cx-payment-method button').contains(' Continue ').click();
        cy.get('cx-global-message').a11yRunContinuumTest();
      });

      it('Order Review', () => {
        cy.get('input[formcontrolname="termsAndConditions"]');
        cy.get('main').a11yRunContinuumTest();
      });
    });
  });
});
