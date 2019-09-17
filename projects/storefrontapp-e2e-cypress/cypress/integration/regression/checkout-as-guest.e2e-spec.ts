import { assertAddressForm } from '../../helpers/address-book';
import { login } from '../../helpers/auth-forms';
import * as checkout from '../../helpers/checkout-flow';
import { waitForPage } from '../../helpers/checkout-flow';
import { cheapProduct, user } from '../../sample-data/checkout-flow';

context('Checkout as guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.cxConfig({ features: { guestCheckout: true } });
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

  describe('Guest account', () => {
    it('should be able to check order in order history', () => {
      checkout.viewOrderHistoryWithCheapProduct();
    });

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

      cy.get('cx-update-profile-form').within(() => {
        cy.get('[formcontrolname="titleCode"]')
          .find(':selected')
          .should('have.value', 'mr');
        cy.get('[formcontrolname="firstName"]').should(
          'have.value',
          user.firstName
        );
        cy.get('[formcontrolname="lastName"]').should(
          'have.value',
          user.lastName
        );
      });
    });
  });

  describe('Guest cart merge', () => {
    it('should keep guest cart content and restart checkout', () => {
      checkout.signOut();

      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();

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

      checkout.fillAddressFormWithCheapProduct();

      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.getByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`);
      login(user.email, user.password);

      cy.wait(`@${shippingPage}`);

      cy.get('cx-mini-cart .count').contains('1');

      const cartPage = waitForPage('/cart', 'getCartPage');
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`);

      cy.get('cx-cart-item-list')
        .contains('cx-cart-item', cheapProduct.code)
        .within(() => {
          cy.get('.cx-counter-value').should('have.value', '1');
        });
    });
  });
});
