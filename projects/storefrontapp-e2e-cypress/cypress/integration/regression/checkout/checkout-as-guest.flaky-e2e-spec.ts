import { CheckoutConfig } from '@spartacus/storefront';
import { assertAddressForm } from '../../../helpers/address-book';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import { waitForPage } from '../../../helpers/checkout-flow';
import { validateUpdateProfileForm } from '../../../helpers/update-profile';
import { cheapProduct, user } from '../../../sample-data/checkout-flow';

context('Checkout as guest', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('Guest checkout', () => {
    it('should add product to cart and go to login', () => {
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();

      cy.get('.register').findByText(/Guest Checkout/i);

      guestCheckout.loginAsGuest();
    });

    it('should checkout as guest', () => {
      checkout.fillAddressFormWithCheapProduct();
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct();
      checkout.placeOrderWithCheapProduct();
      checkout.verifyOrderConfirmationPageWithCheapProduct();
    });
  });

  describe('Create account', () => {
    it('should create an account', () => {
      guestCheckout.createAccountFromGuest(user.password);
    });
  });

  describe('Guest account', () => {
    it('should show address in Address Book', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      assertAddressForm(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: '',
          address: user.address,
        },
        'US-CT'
      );
    });

    it('should show payment in Payment Methods', () => {
      cy.selectUserMenuOption({
        option: 'Payment Details',
      });

      cy.get('.cx-payment .cx-body').then(() => {
        cy.get('cx-card').should('exist');
      });
    });

    it('should show personal details in Personal Details', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      validateUpdateProfileForm('mr', user.firstName, user.lastName);
      checkout.signOut();
    });
  });

  describe('Guest cart merge', () => {
    before(() => {
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    });
    it('should keep guest cart content and restart checkout', () => {
      cy.clearLocalStorage();
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();

      guestCheckout.loginAsGuest();

      checkout.fillAddressFormWithCheapProduct();

      const shippingPage = checkout.waitForPage(
        '/checkout/shipping-address',
        'getShippingPage'
      );

      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.findByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('status').should('eq', 200);

      login(user.email, user.password);
      cy.wait(`@${shippingPage}`).its('status').should('eq', 200);

      cy.get('cx-mini-cart .count').contains('1');

      const cartPage = waitForPage('/cart', 'getCartPage');
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`).its('status').should('eq', 200);

      cy.get('cx-cart-item-list')
        .contains('cx-cart-item', cheapProduct.code)
        .within(() => {
          cy.get('cx-item-counter input').should('have.value', '1');
        });
    });
  });
});
