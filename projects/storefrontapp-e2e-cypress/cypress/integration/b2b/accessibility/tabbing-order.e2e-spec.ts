import { tabbingOrderConfig as config } from '../../../helpers/accessibility/b2b/tabbing-order.config';
import { checkoutPaymentMethodTabbingOrder } from '../../../helpers/accessibility/tabbing-order/checkout/b2b/payment-method';
import {
  checkoutDeliveryModeTabbingOrder,
  checkoutDeliveryModeTabbingOrderAccount,
} from '../../../helpers/accessibility/tabbing-order/checkout/delivery-mode';
import {
  checkoutBillingAddressTabbingOrder,
  checkoutPaymentDetailsTabbingOrder,
} from '../../../helpers/accessibility/tabbing-order/checkout/payment-details';
import { checkoutReviewOrderTabbingOrder } from '../../../helpers/accessibility/tabbing-order/checkout/review-order';
import {
  checkoutShippingAddressAccount,
  checkoutShippingAddressExistingTabbingOrder,
  checkoutShippingAddressNewTabbingOrder,
} from '../../../helpers/accessibility/tabbing-order/checkout/shipping-address';
import { generateMail, randomString } from '../../../helpers/user';
import { b2bUser } from '../../../sample-data/b2b-checkout';

describe('Tabbing order for B2B checkout', () => {
  describe('Checkout Credit Card', () => {
    before(() => {
      b2bUser.registrationData.email = generateMail(randomString(), true);
      cy.requireLoggedIn(b2bUser);

      cy.window()
        .then((win) =>
          JSON.parse(win.localStorage.getItem('spartacus-local-data'))
        )
        .then(({ auth }) => cy.requireProductAddedToCart(auth));
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    context('Method of Payment', () => {
      it('should allow to navigate with tab key (Credit Card)', () => {
        checkoutPaymentMethodTabbingOrder(config.paymentMethod);
      });
    });

    context('Shipping address', () => {
      it('should allow to navigate with tab key (add address)', () => {
        checkoutShippingAddressNewTabbingOrder(config.shippingAddressNew);
      });

      it('should allow to navigate with tab key (choose existing)', () => {
        checkoutShippingAddressExistingTabbingOrder(
          config.shippingAddressExisting
        );
      });
    });

    context('Delivery mode', () => {
      it('should allow to navigate with tab key', () => {
        checkoutDeliveryModeTabbingOrder(config.deliveryMode);
      });
    });

    context('Payment details', () => {
      it('should allow to navigate with tab key (card)', () => {
        checkoutPaymentDetailsTabbingOrder(config.paymentDetailsCard);
      });

      it('should allow to navigate with tab key (billing address)', () => {
        checkoutBillingAddressTabbingOrder(config.paymentDetailsBillingAddress);
      });
    });

    context('Review order', () => {
      it('should allow to navigate with tab key', () => {
        checkoutReviewOrderTabbingOrder(config.checkoutReviewOrder, true);
        cy.saveLocalStorage();
      });
    });
  });

  describe('Checkout Account', () => {
    before(() => {
      cy.restoreLocalStorage();
      cy.window().then((win) => {
        const { auth } = JSON.parse(
          win.localStorage.getItem('spartacus-local-data')
        );
        const cartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿powertools-spa⚿cart')
        ).active;

        cy.requireProductAddedToCart(auth, cartCode);
      });
      cy.saveLocalStorage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    context('Method of Payment', () => {
      it('should allow to navigate with tab key (Account)', () => {
        checkoutPaymentMethodTabbingOrder(config.paymentMethod, true);
      });
    });

    context('Shipping address', () => {
      it('should allow to navigate with tab key', () => {
        checkoutShippingAddressAccount(config.shippingAddressAccount);
      });
    });

    context('Delivery mode', () => {
      it('should allow to navigate with tab key', () => {
        checkoutDeliveryModeTabbingOrderAccount(config.deliveryMode);
      });
    });

    context('Review order', () => {
      it('should allow to navigate with tab key', () => {
        checkoutReviewOrderTabbingOrder(
          config.checkoutReviewOrderAccount,
          true
        );
      });
    });
  });
});
