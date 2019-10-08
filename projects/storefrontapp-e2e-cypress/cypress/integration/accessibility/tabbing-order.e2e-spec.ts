import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/close-account';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import { addProduct } from '../../helpers/accessibility/tabbing-order';
import { registerTabbingOrder } from '../../helpers/accessibility/tabbing-order/register';
import { forgotPasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/reset-password';
import { homeTabbingOrder } from '../../helpers/accessibility/tabbing-order/home';
import { changePasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/change-password';
import { updateEmailTabbingOrder } from '../../helpers/accessibility/tabbing-order/update-email';
import { personalDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/personal-details';
import { paymentDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/payment-details';
import {
  addressBookFormTabbingOrder,
  addressBookDirectoryTabbingOrder,
  setupForAddressBookTests,
} from '../../helpers/accessibility/tabbing-order/address-book';
import { consentManagementTabbingOrder } from '../../helpers/accessibility/tabbing-order/consent-management';
import { cartTabbingOrder } from '../../helpers/accessibility/tabbing-order/cart';
import { addToCartTabbingOrder } from '../../helpers/accessibility/tabbing-order/add-to-cart';
import {
  checkoutShippingAddressNewTabbingOrder,
  checkoutShippingAddressExistingTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/checkout/shipping-address';
import { checkoutDeliveryModeTabbingOrder } from '../../helpers/accessibility/tabbing-order/checkout/delivery-mode';
import {
  orderHistoryNoOrdersTabbingOrder,
  orderHistoryWithOrdersTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/order-history';
import {
  checkoutPaymentDetailsTabbingOrder,
  checkoutBillingAddressTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/checkout/payment-details';
import { headerTabbingOrder } from '../../helpers/accessibility/tabbing-order/header';
import { orderDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/order-details';
import { checkoutReviewOrderTabbingOrder } from '../../helpers/accessibility/tabbing-order/checkout/review-order';
import { productPageTabbingOrder } from '../../helpers/accessibility/tabbing-order/product-page';
import {
  productListTabbingOrderDesktop,
  productListTabbingOrderMobile,
  productListTabbingOrderMobileFilters,
} from '../../helpers/accessibility/tabbing-order/product-list';
import { productPageTabsTabbingOrder } from '../../helpers/accessibility/tabbing-order/product-page-tabs';

context("Tabbing order - tests don't require user to be logged in", () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('Header - Desktop (not logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerDesktopNotLoggedIn);
    });
  });

  describe('Header - Mobile (not logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerMobileNotLoggedIn, true);
    });
  });

  describe('Home page', () => {
    it('should allow to navigate with tab key', () => {
      homeTabbingOrder(config.home);
    });
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

  describe('Product List', () => {
    it('should allow to navigate with tab key (desktop - list view)', () => {
      productListTabbingOrderDesktop(config.productListDesktop);
    });

    it('should allow to navigate with tab key (desktop - grid view)', () => {
      productListTabbingOrderDesktop(config.productListDesktop, true);
    });

    it('should allow to navigate with tab key (mobile)', () => {
      productListTabbingOrderMobile(config.productListMobile);
    });

    it('should allow to navigate with tab key (mobile filters)', () => {
      productListTabbingOrderMobileFilters(config.productListMobileFilters);
    });
  });

  describe('Product Page', () => {
    it('should allow to navigate with tab key', () => {
      productPageTabbingOrder(config.productPage);
    });
  });

  describe('Product Page Tabs', () => {
    it('should allow to navigate with tab key', () => {
      productPageTabsTabbingOrder();
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

  describe('Header - Desktop (logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerDesktopLoggedIn, false, true);
    });
  });

  describe('Header - Mobile (logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerMobileLoggedIn, true, true);
    });
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
      cy.getAllByText(/Proceed to checkout/i)
        .first()
        .click(); // move to checkout
      cy.get('cx-breadcrumb').should('contain', 'Checkout'); // check if we begin checkout tests in checkout
    });

    describe('Shipping address', () => {
      it('should allow to navigate with tab key (add address)', () => {
        checkoutShippingAddressNewTabbingOrder(config.shippingAddressNew);
      });

      it('should allow to navigate with tab key (choose existing)', () => {
        cy.visit('/checkout/shipping-address'); // revisit shipping address page, so the address card is visible
        checkoutShippingAddressExistingTabbingOrder(
          config.shippingAddressExisting
        );
      });
    });

    describe('Delivery mode', () => {
      it('should allow to navigate with tab key', () => {
        checkoutDeliveryModeTabbingOrder(config.deliveryMode);
      });
    });

    describe('Payment details', () => {
      it('should allow to navigate with tab key (card)', () => {
        checkoutPaymentDetailsTabbingOrder(config.paymentDetailsCard);
      });

      it('should allow to navigate with tab key (billing address)', () => {
        checkoutBillingAddressTabbingOrder(config.paymentDetailsBillingAddress);
      });
    });

    describe('Review order', () => {
      it('should allow to navigate with tab key', () => {
        checkoutReviewOrderTabbingOrder(config.checkoutReviewOrder);
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
      paymentDetailsTabbingOrder(config.paymentDetails);
    });
  });

  describe('Order Details', () => {
    it('should allow to navigate with tab key', () => {
      orderDetailsTabbingOrder(config.orderDetails);
    });
  });
});
