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
    ...newAddress,
    firstName: 'Baz',
    lastName: 'Qux'
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

  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('when anonymous user', () => {
    it('should NOT be able to open address book page if not logged in', () => {
      cy.visit('/my-account/address-book');
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('when logged in', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.visit('/my-account/address-book');
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
    });

    it('should display the edited address card in the address book', () => {
      cy.get('cx-address-card').should('have.length', 1);
      assertAddressForm(editedAddress);
    });

    it('should add a second address', () => {
      const secondAddress = {
        ...newAddress,
        firstName: 'N',
        lastName: 'Z'
      };
      cy.get('button')
        .contains(' Add new address ')
        .click();
      fillShippingAddress(secondAddress);
      cy.get('cx-address-card').should('have.length', 2);
    });

    it('should set the second address as the default one', () => {
      cy.get('.set-default').click();

      const firstCard = cy.get('cx-address-card').first();
      firstCard.should('contain', '✓ DEFAULT');
      firstCard.should('contain', 'N Z');
    });

    it('should delete the existing address', () => {
      let firstCard = cy.get('cx-address-card').first();

      firstCard.find('.delete').click();
      // cy.get('.cx-address-card__delete-msg').should(
      //   'contain',
      //   'Are you sure you want to delete this payment method?'
      // );

      // click cancel
      cy.get('.btn-secondary').should('contain', 'cancel');
      cy.get('.btn-secondary').click();
      cy.get('.cx-address-card__delete-msg').should(
        'not.contain',
        'Are you sure you want to delete this address?'
      );

      // click delete
      firstCard = cy.get('cx-address-card').first();
      firstCard.find('.delete').click();
      cy.get('.cx-address-card--delete-mode button.btn-primary').click();
      cy.get('cx-global-message').contains('Address deleted successfully!');
    });
  });
});
