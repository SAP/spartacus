import { manipulateCartQuantity } from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Currency switch - checkout page', () => {
  const checkoutShippingPath =
    siteContextSelector.CHECKOUT_SHIPPING_ADDRESS_PATH;
  const checkoutDeliveryPath = siteContextSelector.CHECKOUT_DELIVERY_MODE_PATH;
  const checkoutPaymentPath = siteContextSelector.CHECKOUT_PAYMENT_DETAILS_PATH;
  const checkoutReviewPath = siteContextSelector.CHECKOUT_REVIEW_ORDER_PATH;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    siteContextSelector.doPlaceOrder();
    manipulateCartQuantity();
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('checkout page', () => {
    it('should change currency in the shipping address url', () => {
      // page being already tested in currency-address-book
      siteContextSelector.verifySiteContextChangeUrl(
        checkoutShippingPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutShippingPath
      );

      siteContextSelector.addressBookNextStep();
    });

    it('should change currency in the checkoutDelvieryPath url', () => {
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutDeliveryPath
      );
    });

    it('should change currency in the checkoutDelvieryPath page', () => {
      cy.get('cx-delivery-mode .cx-delivery-price:first').should(
        'have.text',
        ' ¥80 '
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
      cy.get('cx-review-submit .cx-price .cx-value').should(
        'have.text',
        ' ¥9,720 '
      );
    });
  });
});
