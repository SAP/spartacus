import { manipulateCartQuantity } from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - checkout page', () => {
  const checkoutShippingPath =
    siteContextSelector.CHECKOUT_SHIPPING_ADDRESS_PATH;
  const checkoutDeliveryPath = siteContextSelector.CHECKOUT_DELIVERY_MODE_PATH;
  const checkoutPaymentPath = siteContextSelector.CHECKOUT_PAYMENT_DETAILS_PATH;
  const checkoutReviewPath = siteContextSelector.CHECKOUT_REVIEW_ORDER_PATH;
  const deutschName = siteContextSelector.PRODUCT_NAME_CART_DE;

  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
    cy.requireLoggedIn();
    siteContextSelector.doPlaceOrder();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('populate cart, history, quantity', () => {
    it('should have basic data', () => {
      manipulateCartQuantity();
    });
  });

  describe('checkout page', () => {
    it('should change language throughout checkout process', () => {
      // page being already tested in language-address-book
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
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutShippingPath
      );

      siteContextSelector.addressBookNextStep();

      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutDeliveryPath
      );

      cy.get('cx-delivery-mode .cx-delivery-mode:first').should(
        'have.text',
        'Standard-Lieferung'
      );

      siteContextSelector.deliveryModeNextStep();

      // page being already tested in language-payment-details

      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutPaymentPath
      );

      siteContextSelector.paymentDetailsNextStep();

      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE_USD + checkoutReviewPath
      );

      cy.get('cx-review-submit .cx-link').should('contain', deutschName);
    });
  });
});
