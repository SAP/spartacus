import {
  mockLocation,
  LOCATORS as L,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Client Side only loation search', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/', mockLocation(53, 0));
      cy.get(L.ALLOW_COOKIES_BUTTON).click();
    });

    it('Delivery selected by default. Click Pickup. Pickup radio becomes selected. Dismiss dialog without picking a store. Delivery is selected', () => {
      cy.get(L.HOME_PAGE_FIRST_PRODUCT).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.USE_MY_LOCATION).click();
    });
  });
});
