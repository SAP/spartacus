import { user } from '../../../../sample-data/checkout-flow';
import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Language switch - order page', () => {
  const orderPath = '/USD/my-account/orders';
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

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.server();
    cy.route(siteContextSelector.LANGUAGE_REQUEST).as('languages');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('order page', () => {
    it('should change language in the url', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + orderPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.url().should('eq', siteContextSelector.FULL_BASE_URL_DE + orderPath);
    });

    it('should change language in the page', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + orderPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.get(
        'cx-order-history .cx-order-history-placed .cx-order-history-value'
      )
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
