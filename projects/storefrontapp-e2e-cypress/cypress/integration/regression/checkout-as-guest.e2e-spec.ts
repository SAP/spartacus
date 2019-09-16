import * as checkout from '../../helpers/checkout-flow';
import { waitForPage } from '../../helpers/checkout-flow';
import { user } from '../../sample-data/checkout-flow';

context('Checkout as guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('Add product and proceed to checkout', () => {
    it('should add product to cart and go to login', () => {
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();
    });

    it('should show the guest checkout button', () => {
      cy.get('.register').getByText(/Guest Checkout/i);
    });
  });

  describe('Login as guest', () => {
    it('should add product to cart and go to login', () => {
      const guestLoginPage = checkout.waitForPage(
        '/checkout-login',
        'getguestLoginPage'
      );
      cy.get('.register')
        .getByText(/Guest Checkout/i)
        .click();
      cy.wait(`@${guestLoginPage}`);
      cy.get('cx-checkout-login').within(() => {
        cy.get('[formcontrolname="email"]')
          .clear()
          .type(user.email);
        cy.get('[formcontrolname="emailConfirmation"]')
          .clear()
          .type(user.email);
        cy.get('button[type=submit]').click();
      });
      const shippingPage = waitForPage(
        '/checkout/shipping-address',
        'getShippingPage'
      );
      cy.wait(`@${shippingPage}`);
    });
  });

  describe('Checkout', () => {
    it('should fill in address form', () => {
      checkout.fillAddressFormWithCheapProduct();
    });

    it('should choose delivery', () => {
      checkout.chooseDeliveryMethod();
    });

    it('should fill in payment form', () => {
      checkout.fillPaymentFormWithCheapProduct();
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct();
    });

    it('should display summary page', () => {
      checkout.verifyOrderConfirmationPageWithCheapProduct();
    });
  });

  describe('Create account', () => {
    it('should create an account', () => {
      const homePage = waitForPage('homepage', 'getHomePage');

      cy.get('cx-guest-register-form').within(() => {
        cy.get('[formcontrolname="password"]')
          .clear()
          .type(user.password);
        cy.get('[formcontrolname="passwordconf"]')
          .clear()
          .type(user.password);
        cy.get('button[type=submit]').click();
      });
      cy.wait(`@${homePage}`);
    });
  });
});
