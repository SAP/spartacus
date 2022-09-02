export function mockLocation(
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

const BOPIS_TAG = 'cx-pickup-delivery-options';
export const LOCATORS = {
  DELIVERY_RADIO_BUTTON: '#delivery',
  PICKUP_IN_STORE_RADIO_BUTTON: '#pickup',
  USE_MY_LOCATION: '#lnkUseMyLocation',
  PICKUP_FROM_HERE_BUTTON_NOTTINGHAM_ICE_CENTER: `[data-pickup-in-store-button="Nottingham Ice Center"]`,
  ADD_TO_CART: 'span[aria-label="Add to cart"]',
  VIEW_CART: 'a[cxmodalreason="View Cart click"]',
  BOPIS_TAG,
  PICKUP_IN_STORE_MODAL: 'cx-delivery-pickup-options-dialog',
  HIDE_OUT_OF_STOCK_CHECK_BOX: '#chkHideOutOfStock',
  SEARCH_LOCATION_TEXTBOX: '#txtFindAStore',
  FIND_STORES_BUTTON: '#btnFindStores',
  SELECT_STORE_LINK: `${BOPIS_TAG} a.cx-action-link`,
  DIALOG_CLOSE: 'button.cx-dialog-close',
  ALLOW_COOKIES_BUTTON: `cx-anonymous-consent-management-banner button.btn-primary`,
  ACTIVE_PICK_UP_IN_STORE_BUTTON: `div.cx-store-pick-up-from-here button[data-pickup-in-store-button]:not([disabled])`,
  CHANGE_STORE_LINK: `a[data-change-store-location-link]`
};
