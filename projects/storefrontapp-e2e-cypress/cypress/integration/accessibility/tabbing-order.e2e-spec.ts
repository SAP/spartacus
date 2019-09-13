import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/close-account';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import {
  registerAndLogin,
  loginRequest,
  login,
  register,
} from '../../helpers/accessibility/tabbing-order';
import { registerTabbingOrder } from '../../helpers/accessibility/tabbing-order/register';
import { forgotPasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/reset-password';
import { changePasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/change-password';
import { updateEmailTabbingOrder } from '../../helpers/accessibility/tabbing-order/update-email';
import { personalDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/personal-details';
import { paymentDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/payment-details';
import {
  paymentDetailCard,
  addSecondaryPaymentCard,
} from '../../helpers/payment-methods';
import {
  addressBookFormTabbingOrder,
  addressBookDirectoryTabbingOrder,
  setupForAddressBookTests,
} from '../../helpers/accessibility/tabbing-order/address-book';
import { consentManagementTabbingOrder } from '../../helpers/accessibility/tabbing-order/consent-management';
import { cartTabbingOrder } from '../../helpers/accessibility/tabbing-order/cart';
import { addToCartTabbingOrder } from '../../helpers/accessibility/tabbing-order/add-to-cart';
import { signOut } from '../../helpers/register';

context("Tabbing order - tests don't require user to be logged in", () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('Footer', () => {
    it('should allow to navigate with tab key', () => {
      footerTabbingOrder(config.footer);
    });
  });

  describe('Login page', () => {
    it('should allow to navigate with tab key (empty form)', () => {
      loginTabbingOrder(config.login);
    });

    it('should allow to navigate with tab key (filled out form)', () => {
      loginTabbingOrder(config.login, true);
    });
  });

  describe('Register page', () => {
    it('should verify tabbing order', () => {
      registerTabbingOrder(config.register);
    });
  });

  describe('Reset password', () => {
    it('should allow to navigate with tab key', () => {
      forgotPasswordTabbingOrder(config.resetPassword);
    });
  });

  describe('Add to cart', () => {
    it('should allow to navigate with tab key', () => {
      addToCartTabbingOrder(config.addToCart);
    });
  });

  describe('Cart', () => {
    it('should allow to navigate with tab key', () => {
      cartTabbingOrder(config.cart);
    });
  });
});

context('Tabbing order - tests do require user to be logged in', () => {
  before(() => {
    register();
    // login();
    // setupForAddressBookTests();
    // signOut();
  });

  beforeEach(() => {
    login();
  });

  afterEach(() => {
    signOut();
  });

  describe('Change password', () => {
    it('should allow to navigate with tab key', () => {
      changePasswordTabbingOrder(config.changePassword);
    });
  });

  describe('Personal details', () => {
    it('should allow to navigate with tab key', () => {
      personalDetailsTabbingOrder(config.personalDetails);
    });
  });

  describe('Update email', () => {
    it('should allow to navigate with tab key', () => {
      updateEmailTabbingOrder(config.updateEmail);
    });
  });

  describe('Close account', () => {
    it('should allow to navigate with tab key', () => {
      closeAccountTabbingOrder(config.closeAccount);
    });
  });

  describe('Consent Management', () => {
    it('should allow to navigate with tab key', () => {
      consentManagementTabbingOrder(config.consentManagement);
    });
  });

  describe('Address Book (Form)', () => {
    it('should allow to navigate with tab key (Directory)', () => {
      setupForAddressBookTests();
      addressBookFormTabbingOrder(config.addressBookForm);
    });

    it('should allow to navigate with tab key (Form)', () => {
      addressBookDirectoryTabbingOrder(config.addressBookDirectory);
    });
  });

  describe('Payment Details', () => {
    it('should allow to navigate with tab key', () => {
      paymentDetailCard();
      addSecondaryPaymentCard();

      paymentDetailsTabbingOrder(config.paymentDetails);
    });
  });
});
