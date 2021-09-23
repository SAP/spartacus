import {
  assertAddressForm,
  createNewAddress,
  editedAddress,
  newAddress,
  verifyNewAddress,
} from '../../../helpers/address-book';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';
import * as alerts from '../../../helpers/global-message';
import { fillShippingAddress } from '../../../helpers/checkout-forms';

describe('My Account - Address Book', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('address book test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit('/my-account/address-book');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('address book test for logged in user', () => {
      before(() => {
        cy.requireLoggedIn();
        cy.reload();
        cy.visit('/');
        cy.selectUserMenuOption({
          option: 'Address Book',
        });
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      it('should display a new address form when no address exists', () => {
        cy.get('cx-address-form').should('exist');
      });

      it('should create a new address', () => {
        fillShippingAddress(newAddress);
      });

      it('should display the newly added address card in the address book', () => {
        verifyNewAddress();
      });

      it('should edit the existing address', () => {
        cy.get('a').contains('Edit').click();
        cy.get('cx-address-form').within(() => {
          cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
          cy.get('[formcontrolname="firstName"]')
            .clear()
            .type(editedAddress.firstName);
          cy.get('[formcontrolname="lastName"]')
            .clear()
            .type(editedAddress.lastName);
          cy.get('[formcontrolname="phone"]').clear().type(editedAddress.phone);

          cy.get('button.btn-primary').click();
        });
      });

      it('should display the edited address card in the address book', () => {
        cy.get('cx-card').should('have.length', 1);
        assertAddressForm(editedAddress);
      });

      it('should add a second address', () => {
        const secondAddress = {
          ...newAddress,
          firstName: 'N',
          lastName: 'Z',
        };
        cy.get('button').contains(' Add new address ').click({ force: true });
        fillShippingAddress(secondAddress);
        cy.get('cx-card').should('have.length', 2);
      });

      it('should set the second address as the default one', () => {
        cy.get('a').contains('Set as default').click();

        const firstCard = cy.get('cx-card').first();
        firstCard.should('contain', '✓ DEFAULT');
        firstCard.should('contain', 'N Z');
      });

      it('should delete the existing address', () => {
        const firstCard = cy.get('cx-card').first();

        firstCard.within(() => {
          cy.get('a').contains('Delete').click();
        });

        cy.get('.cx-card-delete-msg').should(
          'contain',
          'Are you sure you want to delete this address?'
        );

        // click cancel
        cy.get('.btn-secondary').should('contain', 'Cancel');
        cy.get('.btn-secondary').click();
        cy.get('.cx-card-delete-msg').should('not.exist');

        // click delete
        cy.intercept({
          method: 'DELETE',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/*/addresses/*`,
          query: {
            lang: 'en',
            curr: 'USD',
          },
        }).as('deleteAddress');
        cy.intercept({
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/*/addresses`,
          query: {
            lang: 'en',
            curr: 'USD',
          },
        }).as('fetchAddresses');

        const card = cy.get('cx-card').first();
        card.contains('Delete').click();
        cy.get('.cx-card-delete button.btn-primary').click();
        cy.wait('@deleteAddress').its('response.statusCode').should('eq', 200);
        cy.wait('@fetchAddresses').its('response.statusCode').should('eq', 200);
        alerts.getSuccessAlert().contains('Address deleted successfully!');

        cy.get('cx-card').should('have.length', 1);

        // verify remaining address is now the default one
        const defaultCard = cy.get('cx-card').first();
        defaultCard.should('contain', '✓ DEFAULT');
        defaultCard.should('contain', 'Baz Qux');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
