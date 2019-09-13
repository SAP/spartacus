import { checkAllElements, TabElement } from '../tabbing-order';

export function setupForAddressBookTests() {
  addAddress();
  addAddress();
}

export function addressBookFormTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/address-book');

  cy.get('.BodyContent')
    .contains('Add new address')
    .click();

  selectCountryCanada();

  cy.get('cx-address-book ng-select input')
    .first()
    .focus();

  checkAllElements(config);
}

export function addressBookDirectoryTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/address-book');

  cy.get('.BodyContent')
    .contains('Add new address')
    .focus();

  checkAllElements(config);
}

function addAddress() {
  const address = {
    country: { isocode: 'AD' },
    defaultAddress: false,
    firstName: 'asdfg@gmail.com',
    lastName: 'A$DF12',
    line1: 'sdaf',
    line2: '',
    phone: '',
    postalCode: '4132',
    titleCode: '',
    town: 'fasd',
  };

  let authObj;
  cy.window()
    .then(win => JSON.parse(win.localStorage.getItem('spartacus-local-data')))
    .then(({ auth }) => {
      authObj = auth;
      getAddressRequest(authObj, address, true);
    })
    .then(() => getAddressRequest(authObj, address, false));
}

function getAddressRequest(auth, address, verify: boolean) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env(
      'API_URL'
    )}/rest/v2/electronics-spa/users/current/addresses${
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
  cy.server();
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/countries/CA/regions*`
  ).as('regions');

  cy.get('cx-address-book .country-select').ngSelect('Canada');

  cy.wait('@regions');
}
