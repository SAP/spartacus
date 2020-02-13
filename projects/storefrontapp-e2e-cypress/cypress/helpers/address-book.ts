import { AddressData, fillShippingAddress } from './checkout-forms';
import * as alerts from './global-message';

export const newAddress: AddressData = {
  firstName: 'Foo',
  lastName: 'Bar',
  phone: '1234567',
  address: {
    city: 'NS',
    country: 'Canada',
    line1: 'xxx1',
    line2: 'xxx2',
    postal: '21000',
    state: 'Quebec',
  },
};
export const editedAddress: AddressData = {
  ...newAddress,
  firstName: 'Baz',
  lastName: 'Qux',
};

export const assertAddressForm = (
  address: AddressData,
  state?: string
): void => {
  state = state ? state : 'CA-QC';
  cy.get('cx-card .card-header').contains('✓ DEFAULT');
  cy.get('cx-card .card-body').within(_ => {
    cy.get('.cx-card-label-bold').should(
      'contain',
      `${address.firstName} ${address.lastName}`
    );
    cy.get('.cx-card-label')
      .eq(0)
      .should('contain', address.address.line1);
    cy.get('.cx-card-label')
      .eq(1)
      .should('contain', address.address.line2);
    cy.get('.cx-card-label')
      .eq(2)
      .should('contain', `${address.address.city}, ${state}`);
    cy.get('.cx-card-label')
      .eq(3)
      .should('contain', address.address.postal);
    cy.get('.cx-card-label')
      .eq(4)
      .should('contain', address.phone);
  });
};

export function accessPageAsAnonymous() {
  cy.visit('/my-account/address-book');
  cy.location('pathname').should('contain', '/login');
}

export function displayAddressForm() {
  cy.get('cx-address-form').should('exist');
}

export function createNewAddress() {
  fillShippingAddress(newAddress);
}

export function verifyNewAddress() {
  cy.get('cx-card').should('have.length', 1);
  assertAddressForm(newAddress);
}

export function editAddress() {
  cy.get('a')
    .contains('Edit')
    .click();
  cy.get('cx-address-form').within(() => {
    cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type(editedAddress.firstName);
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type(editedAddress.lastName);
    cy.get('[formcontrolname="phone"]')
      .clear()
      .type(editedAddress.phone);

    cy.get('button.btn-primary').click();
  });
}

export function verifyEditedAddress() {
  cy.get('cx-card').should('have.length', 1);
  assertAddressForm(editedAddress);
}

export function addSecondAddress() {
  const secondAddress = {
    ...newAddress,
    firstName: 'N',
    lastName: 'Z',
  };
  cy.get('button')
    .contains(' Add new address ')
    .click({ force: true });
  fillShippingAddress(secondAddress);
  cy.get('cx-card').should('have.length', 2);
}

export function setSecondAddressToDefault() {
  cy.get('a')
    .contains('Set as default')
    .click();

  const firstCard = cy.get('cx-card').first();
  firstCard.should('contain', '✓ DEFAULT');
  firstCard.should('contain', 'N Z');
}

export function deleteExistingAddress() {
  const firstCard = cy.get('cx-card').first();

  firstCard.within(() => {
    cy.get('a')
      .contains('Delete')
      .click();
  });

  cy.get('.cx-card-delete-msg').should(
    'contain',
    'Are you sure you want to delete this address?'
  );

  // click cancel
  cy.get('.btn-secondary').should('contain', 'Cancel');
  cy.get('.btn-secondary').click();
  cy.get('.cx-card-delete-msg').should(
    'not.contain',
    'Are you sure you want to delete this address?'
  );

  // click delete
  deleteFirstAddress();
  alerts.getSuccessAlert().contains('Address deleted successfully!');

  cy.get('cx-card').should('have.length', 1);

  // verify remaining address is now the default one
  const defaultCard = cy.get('cx-card').first();
  defaultCard.should('contain', '✓ DEFAULT');
  defaultCard.should('contain', 'Baz Qux');
}

export function verifyAsAnonymous() {
  it('should redirect to login page for anonymous user', () => {
    accessPageAsAnonymous();
  });
}

export function deleteFirstAddress() {
  cy.server();
  cy.route(
    'DELETE',
    '/rest/v2/electronics-spa/users/*/addresses/*?lang=en&curr=USD'
  ).as('deleteAddress');
  cy.route('/rest/v2/electronics-spa/users/*/addresses?lang=en&curr=USD').as(
    'fetchAddresses'
  );

  const firstCard = cy.get('cx-card').first();
  firstCard.contains('Delete').click();
  cy.get('.cx-card-delete button.btn-primary').click();
  cy.wait('@deleteAddress')
    .its('status')
    .should('eq', 200);
  cy.wait('@fetchAddresses')
    .its('status')
    .should('eq', 200);
}

export function addressBookTest() {
  it('should display a new address form when no address exists', () => {
    displayAddressForm();
  });

  it('should create a new address', () => {
    createNewAddress();
  });

  it('should display the newly added address card in the address book', () => {
    verifyNewAddress();
  });

  it('should edit the existing address', () => {
    editAddress();
  });

  it('should display the edited address card in the address book', () => {
    verifyEditedAddress();
  });

  it('should add a second address', () => {
    addSecondAddress();
  });

  it('should set the second address as the default one', () => {
    setSecondAddressToDefault();
  });

  it('should delete the existing address', () => {
    deleteExistingAddress();
  });
}
