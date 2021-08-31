import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement, TabbingOrderTypes } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

const addressBookDirectoryConfig: TabElement[] = [
  {
    value: 'Add new address',
    type: TabbingOrderTypes.BUTTON,
  },
  {
    value: 'Edit',
    type: TabbingOrderTypes.LINK,
  },
  {
    value: 'Delete',
    type: TabbingOrderTypes.LINK,
  },
];

const addressBookCardConfig: TabElement[] = [
  {
    value: 'Set as default',
    type: TabbingOrderTypes.LINK,
  },
  {
    value: 'Edit',
    type: TabbingOrderTypes.LINK,
  },
  {
    value: 'Delete',
    type: TabbingOrderTypes.LINK,
  },
];

export function setupForAddressBookTests() {
  addAddress();
  addAddress();
}

export function addressBookFormTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/address-book');

  cy.get('.BodyContent').contains('Add new address').click();

  selectCountryCanada();

  verifyTabbingOrder(containerSelector, config);
}

export function addressBookDirectoryTabbingOrder() {
  let config: TabElement[];
  cy.visit('/my-account/address-book');

  config = addressBookDirectoryConfig;

  // dynamically adding card tabbing config
  cy.get('.cx-card')
    .each((_, i) => {
      // ignoring the first card, since it has a different config
      if (i > 0) {
        config = [...config, ...addressBookCardConfig];
      }
    })
    .then(() => {
      cy.get('.BodyContent').contains('Add new address').focus();

      verifyTabbingOrder(containerSelector, config);
    });
}

function addAddress() {
  const address = {
    country: { isocode: 'AD' },
    defaultAddress: false,
    firstName: 'Winston',
    lastName: 'Rumfoord',
    line1: 'Chrono-Synclastic Infundibulum',
    line2: 'Betelgeuse',
    phone: '555 555 555',
    postalCode: '06247',
    titleCode: '',
    town: 'Tralfamadore',
  };

  let authObj;
  cy.window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus-local-data')))
    .then(({ auth }) => {
      authObj = auth;
      getAddressRequest(authObj, address, true);
    })
    .then(() => getAddressRequest(authObj, address, false));
}

function getAddressRequest(auth, address, verify: boolean) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/addresses${
      verify ? '/verification' : ''
    }?lang=en&curr=USD`,
    body: address,
    form: false,
    headers: {
      Authorization: `bearer ${auth.userToken.token.access_token}`,
    },
  });
}

function selectCountryCanada() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/countries/CA/regions`,
  }).as('regions');

  cy.get('cx-address-book .country-select').ngSelect('Canada');

  cy.wait('@regions');
}
