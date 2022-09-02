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

const BOPIS_TAG = 'cx-pickup-options';
export const LOCATORS = {
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
  CHANGE_STORE_LINK: `a[data-change-store-location-link]`,
  PICKUP_STORE_LOCATION: `[data-pickup-location]`,
  PICKUP_STORE_LOCATION_NOT_VALUE: (value) =>
    `[data-pickup-location]:not([data-pickup-location="${value}"])[data-pickup-location]:not([data-pickup-location=""]) `,
  SAP_ICON_HOME_LINK: `.SiteLogo cx-banner cx-generic-link a`,
  PICKUP_OPTIONS_RADIO: `[data-pickup]`,
  PICKUP_OPTIONS_RADIO_DELIVERY: `[data-pickup=delivery]`,
  PICKUP_OPTIONS_RADIO_DELIVERY_CHECKED: `[data-pickup=delivery][aria-checked=true]`,
  PICKUP_OPTIONS_RADIO_DELIVERY_UNCHECKED: `[data-pickup=delivery][aria-checked=false]`,
  PICKUP_OPTIONS_RADIO_PICKUP: `[data-pickup=pickup]`,
  PICKUP_OPTIONS_RADIO_PICKUP_CHECKED: `[data-pickup=pickup][aria-checked=true]`,
  PICKUP_OPTIONS_RADIO_PICKUP_UNCHECKED: `[data-pickup=pickup][aria-checked=false]`,
  LOGIN_LINK: `cx-login a`,
  REGISTER_BUTTON: `cx-login-register a`,
  FORM_TITLE: `#title-select`,
  FORM_TITLE_ENTRY_MR: `div.ng-option:contains('Mr.')`,
  FORM_FIRSTNAME: `input[name=firstname]`,
  FORM_LASTNAME: `input[name=lastname]`,
  FORM_EMAIL: `input[name=email]`,
  FORM_PASSWORD: `input[name=password]`,
  FORM_CONFIRM_PASSWORD: `input[name=confirmpassword]`,
  FORM_NEWSLETTER:  `input[name=newsletter]`,
  FORM_TANDC:  `input[name=termsandconditions]`,
  SUBMIT_REGISTRATION_FORM: `button[type=submit]:contains("Register")`,
  SIGN_IN_BUTTON: `button[type=submit]:contains("Sign In")`,
  SIGNIN_USERNAME: `input[formcontrolname="userId"]`,
  SIGNIN_PASSWORD: `input[formcontrolname="password"]`
};
