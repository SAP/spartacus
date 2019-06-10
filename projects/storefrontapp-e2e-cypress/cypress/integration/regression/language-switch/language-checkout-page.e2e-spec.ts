import { manipulateCartQuantity } from '../../../helpers/cart';
import * as siteContextSelector from '../../../helpers/site-context-selector';

describe('Language switch - checkout page', () => {
  const checkoutShippingPath =
    siteContextSelector.CHECKOUT_SHIPPING_ADDRESS_PATH;
  const checkoutDeliveryPath = siteContextSelector.CHECKOUT_DELIVERY_MODE_PATH;
  const checkoutPaymentPath = siteContextSelector.CHECKOUT_PAYMENT_DETAILS_PATH;
  const checkoutReviewPath = siteContextSelector.CHECKOUT_REVIEW_ORDER_PATH;
  const deutschName = siteContextSelector.PRODUCT_NAME_CART_DE;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    siteContextSelector.doPlaceOrder();
    manipulateCartQuantity();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('checkout page', () => {
    it('should change language in the shipping address url', () => {
      // page being already tested in language-address-book

      siteContextSelector.verifyLanguageChangeUrl(checkoutShippingPath);

      cy.get('cx-shipping-address .cx-card-link').click({ force: true });
      cy.get('cx-shipping-address .btn-primary').click({ force: true });
    });

    it('should change language in the checkoutDelvieryPath url', () => {
      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutDeliveryPath
      );
    });

    it('should change language in the checkoutDelvieryPath page', () => {
      cy.get('cx-delivery-mode .cx-delivery-mode:first').should(
        'have.text',
        'Standard-Lieferung'
      );

      cy.get('cx-delivery-mode #deliveryMode-standard-gross').click({
        force: true,
      });
      cy.get('cx-delivery-mode .btn-primary').click({ force: true });
    });

    it('should change language in the checkoutPaymentPath url', () => {
      // page being already tested in language-payment-details

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutPaymentPath
      );

      cy.get('cx-payment-method .cx-card-link').click({
        force: true,
      });
      cy.get('cx-payment-method .btn-primary').click({ force: true });
    });

    it('should change language in the checkoutReviewPath url', () => {
      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutReviewPath
      );
    });

    it('should change language in the checkoutReviewPath page', () => {
      cy.get('cx-review-submit .cx-link')
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
