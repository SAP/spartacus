import { viewportContext } from '../../../helpers/viewport-context';

function mockLocation(
  latitude: number,
  longitude: number
): Partial<Cypress.VisitOptions> {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
        (successCallback, errorCallback, _options) => {
          if (typeof latitude === 'number' && typeof longitude === 'number') {
            return successCallback({ coords: { latitude, longitude } });
          }

          throw errorCallback({ code: 1 });
        }
      );
    },
  };
}

const PICKUP_IN_STORE_MODAL = 'cx-delivery-pickup-options-dialog';
const PICKUP_IN_STORE_RADIO_BUTTON = '#pickup';
const HIDE_OUT_OF_STOCK_CHECK_BOX = '#chkHideOutOfStock';
const SEARCH_LOCATION_TEXTBOX = '#txtFindAStore';
const FIND_STORES_BUTTON = '#btnFindStores';
const USE_MY_LOCATION = '#lnkUseMyLocation';

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

    xit('should open the pickup locations dialog, and dialog should be closeable', () => {
      cy.get('cx-pickup-delivery-options').should('exist');
      cy.get('#delivery').should('have.attr', 'aria-checked', 'true');
      cy.get(PICKUP_IN_STORE_RADIO_BUTTON).click();
      cy.get(PICKUP_IN_STORE_MODAL).should('exist');
      cy.get('button.cx-dialog-close').click();
      cy.get(PICKUP_IN_STORE_MODAL).should('not.exist');
    });

    xit('should filter out stores with no stock when "Hide out of stock options" is checked', () => {
      cy.get('cx-pickup-delivery-options').should('exist');
      cy.get(PICKUP_IN_STORE_RADIO_BUTTON).click();
      cy.get(PICKUP_IN_STORE_MODAL).should('exist');
      cy.get('cx-store').should('have.length', 20);
      cy.get(HIDE_OUT_OF_STOCK_CHECK_BOX).click();
      cy.get('cx-store').should('have.length', 11);
    });

    xit('uses the search term entered if Find Stores button clicked ', () => {
      cy.get('cx-pickup-delivery-options').should('exist');
      cy.get(PICKUP_IN_STORE_RADIO_BUTTON).click();
      cy.get(PICKUP_IN_STORE_MODAL).should('exist');
      cy.get(SEARCH_LOCATION_TEXTBOX).type('Maidenhead');
      cy.intercept({
        method: 'GET',
        url: '/occ/v2/apparel-uk-spa/products/300310300/stock*',
      }).as('apiSearchStores');
      cy.get(FIND_STORES_BUTTON).click();
      cy.wait('@apiSearchStores').then((interception) => {
        expect(interception.request.url).contain('location=Maidenhead');
      });
    });

    it('uses the location if "Use My Location" link clicked ', () => {
      cy.get('cx-pickup-delivery-options').should('exist');
      cy.get(PICKUP_IN_STORE_RADIO_BUTTON).click();
      cy.get(PICKUP_IN_STORE_MODAL).should('exist');

      cy.intercept({
        method: 'GET',
        url: '/occ/v2/apparel-uk-spa/products/300310300/stock*',
      }).as('apiSearchStores');
      cy.get(USE_MY_LOCATION).click();
      cy.wait('@apiSearchStores').then((interception) => {
        expect(interception.request.url).contain('latitude=53&longitude=0');
      });
    });
  });
});
