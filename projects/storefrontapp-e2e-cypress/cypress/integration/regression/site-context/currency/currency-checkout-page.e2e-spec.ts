import { manipulateCartQuantity } from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Currency switch - checkout page', () => {
  const checkoutShippingPath =
    siteContextSelector.CHECKOUT_SHIPPING_ADDRESS_PATH;
  const checkoutDeliveryPath = siteContextSelector.CHECKOUT_DELIVERY_MODE_PATH;
  const checkoutPaymentPath = siteContextSelector.CHECKOUT_PAYMENT_DETAILS_PATH;
  const checkoutReviewPath = siteContextSelector.CHECKOUT_REVIEW_ORDER_PATH;

  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
    cy.requireLoggedIn();
    siteContextSelector.doPlaceOrder();
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('populate cart, history, quantity', () => {
    it('should have basic data', () => {
      manipulateCartQuantity();
    });
  });

  describe('checkout page', () => {
    it('should change currency in the shipping address url', () => {
      // page being already tested in currency-address-book
      cy.intercept({
        method: 'PUT',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*/addresses/delivery`,
      }).as('setAddress');
      cy.visit(checkoutShippingPath);
      cy.wait('@setAddress');
      siteContextSelector.verifySiteContextChangeUrl(
        null,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutShippingPath
      );

      siteContextSelector.addressBookNextStep();
    });

    it('should change currency in the checkoutDeliveryPath url', () => {
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutDeliveryPath
      );
    });

    it('should change currency in the checkoutDeliveryPath page', () => {
      cy.get('cx-delivery-mode .cx-delivery-price:first').should(
        'contain',
        '¥'
      );
      siteContextSelector.deliveryModeNextStep();
    });

    it('should change currency in the checkoutPaymentPath url', () => {
      // page being already tested in currency-payment-details
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutPaymentPath
      );

      siteContextSelector.paymentDetailsNextStep();
    });

    it('should change currency in the checkoutReviewPath url', () => {
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutReviewPath
      );
    });

    it('should change currency in the checkoutReviewPath page', () => {
      cy.get('cx-review-submit .cx-price .cx-value').should('contain', '¥');
    });
  });
});
