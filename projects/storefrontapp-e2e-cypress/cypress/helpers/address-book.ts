import { AddressData } from './checkout-forms';

export const newAddress: AddressData = {
  firstName: 'Cypress',
  lastName: 'User',
  phone: '1234567',
  address: {
    city: 'Montreal',
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
  cy.get('cx-card .card-body').within(() => {
    cy.get('.cx-card-label-bold').should(
      'contain',
      `${address.firstName} ${address.lastName}`
    );
    cy.get('.cx-card-label').eq(0).should('contain', address.address.line1);
    cy.get('.cx-card-label').eq(1).should('contain', address.address.line2);
    cy.get('.cx-card-label')
      .eq(2)
      .should('contain', `${address.address.city}, ${state}`);
    cy.get('.cx-card-label').eq(3).should('contain', address.address.postal);
    cy.get('.cx-card-label').eq(4).should('contain', address.phone);
  });
};

export function verifyNewAddress() {
  cy.get('cx-card').should('have.length', 1);
  assertAddressForm(newAddress);
}
