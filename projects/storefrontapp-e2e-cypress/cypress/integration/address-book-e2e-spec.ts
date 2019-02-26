import {
  fillShippingAddress,
  ShippingAddressData
} from '../helpers/checkout-forms';

describe('Address management page', () => {
  const newAddress: ShippingAddressData = {
    firstName: 'Foo',
    lastName: 'Bar',
    phone: '1234567',
    address: {
      city: 'NS',
      country: 'Canada',
      line1: 'xxx1',
      line2: 'xxx2',
      postal: '21000',
      state: 'Quebec'
    }
  };
  const editedAddress: ShippingAddressData = {
    firstName: 'Baz',
    lastName: 'Qux',
    phone: '1234567',
    address: {
      city: 'NS',
      country: 'Canada',
      line1: 'xxx3',
      line2: 'xxx4',
      postal: '21100',
      state: 'Quebec'
    }
  };

  const assertAddressForm = (address: ShippingAddressData): void => {
    cy.get('cx-address-card .card-header').contains('✓ DEFAULT');
    cy.get('cx-address-card .card-body').within(_ => {
      cy.get('.cx-address-card__label--bold').contains(
        `${address.firstName} ${address.lastName}`
      );
      cy.get('.address_data > :nth-child(2)').contains(address.address.line1);
      cy.get('.address_data > :nth-child(3)').contains(address.address.line2);
      cy.get('.address_data > :nth-child(4)').contains(
        `${address.address.city}, CA-QC`
      );
      cy.get('.address_data > :nth-child(5)').contains(address.address.postal);
      cy.get('.address_data > :nth-child(6)').contains(address.phone);
    });
  };

  before(() => {
    cy.requireLoggedIn();
    cy.visit('/my-account/address-book');
  });

  it('should NOT be able to open address book page if not logged in', async () => {
    cy.location('pathname').should('contain', '/login');
  });

  it('should display a spinner', () => {
    cy.get('cx-spinner').should('exist');
  });

  it('should display a new address form when no address exists', () => {
    cy.get('cx-address-form').should('exist');
  });

  it('should create a new address', () => {
    fillShippingAddress(newAddress);
  });

  it('should display the newly added address card in the address book', () => {
    cy.get('cx-address-card').should('have.length', 1);
    assertAddressForm(newAddress);
  });

  it('should edit the existing address', () => {
    cy.get('.edit').click();
    fillShippingAddress(editedAddress);
  });

  it('should display the edited address card in the address book', () => {
    cy.get('cx-address-card').should('have.length', 1);
    assertAddressForm(editedAddress);
  });

  it('should delete the existing address', () => {
    cy.get('.delete').click();
    cy.get('.cx-address-card--delete-mode button.btn-primary').click();
    cy.get('cx-global-message').contains('Address deleted successfully!');
  });
});
