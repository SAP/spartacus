import { mockLocation, LOCATORS as L } from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';


describe('Pickup delivery options', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/product/300310300', mockLocation(53, 0));
    });

    it('Delivery selected by default. Click Pickup. Pickup radio becomes selected. Dismiss dialog without picking a store. Delivery is selected', () => {
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('have.attr', 'aria-checked', 'true');
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.USE_MY_LOCATION).click();
      cy.get(L.PICKUP_FROM_HERE_BUTTON_NOTTINGHAM_ICE_CENTER).click();
      cy.get(L.ADD_TO_CART).click();
      cy.get(L.VIEW_CART).click();
    });
  });
});
