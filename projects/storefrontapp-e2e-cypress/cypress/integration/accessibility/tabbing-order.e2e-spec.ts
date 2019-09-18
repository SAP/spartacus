import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/close-account';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import { addProduct } from '../../helpers/accessibility/tabbing-order';
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
import {
  shippingAddressNewTabbingOrder,
  shippingAddressExistingTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/checkout/shipping-address';
import { deliveryModeTabbingOrder } from '../../helpers/accessibility/tabbing-order/checkout/delivery-mode';
import {
  orderHistoryNoOrdersTabbingOrder,
  orderHistoryWithOrdersTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/order-history';
import { reviewOrderTabbingOrder } from '../../helpers/accessibility/tabbing-order/review-order';

context("Tabbing order - tests don't require user to be logged in", () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
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
    it('should allow to navigate with tab key', () => {
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
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('Order History', () => {
    it('should allow to navigate with tab key (no orders)', () => {
      orderHistoryNoOrdersTabbingOrder(config.orderHistoryNoOrders);
    });

    it('should allow to navigate with tab key (with orders)', () => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.requireLoggedIn();
      orderHistoryWithOrdersTabbingOrder();
    });
  });

  describe('Checkout', () => {
    before(() => {
      addProduct();
      cy.getByText(/Proceed to checkout/i).click(); // move to checkout
      cy.get('cx-breadcrumb').should('contain', 'Checkout'); // check if we begin checkout tests in checkout
    });

    describe('Shipping address', () => {
      it('should allow to navigate with tab key (add address)', () => {
        shippingAddressNewTabbingOrder(config.shippingAddressNew);
      });

      it('should allow to navigate with tab key (choose existing)', () => {
        cy.visit('/checkout/shipping-address'); // revisit shipping address page, so the address card is visible
        shippingAddressExistingTabbingOrder(config.shippingAddressExisting);
      });
    });

    describe('Delivery mode', () => {
      it('should allow to navigate with tab key', () => {
        deliveryModeTabbingOrder(config.deliveryMode);
      });
    });
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

  describe('Review Order', () => {
    it('should allow to navigate with tab key', () => {
      reviewOrderTabbingOrder(config.reviewOrder);
    });
  });
});
