import {
  LOCATORS as L,
  mockLocation,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';
describe('Set Preferred store', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/logout', mockLocation(53, 0));
      cy.get(L.ALLOW_COOKIES_BUTTON).click();
    });
    it('A logged in user should be able to set a preferred store when not logged in', () => {
      cy.get(L.HOME_PAGE_FIRST_PRODUCT).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');

      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();
    });
    // it('A logged in user should be able to set a preferred store in when logged in', () => {});
  });
});
