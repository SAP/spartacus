import * as siteContextSelector from '../../../../helpers/site-context-selector';
import { user } from '../../../../sample-data/checkout-flow';

describe('Language switch - order page', () => {
  const orderPath = '/my-account/orders';
  const deutschName = 'Juni';

  function doPlaceOrder() {
    cy.window().then(win => {
      const savedState = JSON.parse(
        win.localStorage.getItem('spartacus-local-data')
      );
      cy.requireProductAddedToCart(savedState.auth).then(resp => {
        cy.requireShippingAddressAdded(user.address, savedState.auth);
        cy.requireShippingMethodSelected(savedState.auth);
        cy.requirePaymentDone(savedState.auth);
        cy.requirePlacedOrder(savedState.auth, resp.cartId);
      });
    });
  }

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    doPlaceOrder();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('order page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(orderPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(orderPath);

      cy.get(
        'cx-order-history .cx-order-history-placed .cx-order-history-value'
      )
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
