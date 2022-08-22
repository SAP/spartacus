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

const BOPIS_TAG = 'cx-pickup-options';
const PICKUP_IN_STORE_MODAL = 'cx-delivery-pickup-options-dialog';
const DELIVERY_RADIO_BUTTON = '#delivery';
const PICKUP_IN_STORE_RADIO_BUTTON = '#pickup';
const HIDE_OUT_OF_STOCK_CHECK_BOX = '#chkHideOutOfStock';
const SEARCH_LOCATION_TEXTBOX = '#txtFindAStore';
const FIND_STORES_BUTTON = '#btnFindStores';
const USE_MY_LOCATION = '#lnkUseMyLocation';
const SELECT_STORE_LINK = `${BOPIS_TAG} a.cx-action-link`;
const PICKUP_FROM_HERE_BUTTON_NOTTINGHAM_ICE_CENTER = `[data-pickup-in-store-button="Nottingham Ice Center"]`;
const DIALOG_CLOSE = 'button.cx-dialog-close';
const ADD_TO_CART = 'span[aria-label="Add to cart"]';
const VIEW_CART = 'a[cxmodalreason="View Cart click"]';

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
      // cy.visit('/apparel-uk-spa/en/GBP/cart', mockLocation(53, 0));
      cy.visit('/product/300310300', mockLocation(53, 0));
    });

    it('Delivery selected by default. Click Pickup. Pickup radio becomes selected. Dismiss dialog without picking a store. Delivery is selected', () => {
      cy.get(DELIVERY_RADIO_BUTTON).should('have.attr', 'aria-checked', 'true');
      cy.get(PICKUP_IN_STORE_RADIO_BUTTON).click();
      cy.get(USE_MY_LOCATION).click();
      cy.get(PICKUP_FROM_HERE_BUTTON_NOTTINGHAM_ICE_CENTER).click();
      cy.get(ADD_TO_CART).click();
      cy.get(VIEW_CART).click();
    });
  });
});
