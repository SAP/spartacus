import { newAddress } from '../../../../helpers/address-book';
import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('CDC B2B scenarios', () => {
  describe('Login existing B2B Customer with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginUser(cdc.b2bUser.email, cdc.b2bUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2bUser.fullName);
    });
  });

  describe('Login existing B2B Customer with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2bUser.fullName);
    });
  });

  describe('Update profile', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
      cdc.loginUser(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update profile', () => {
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });

      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess(cdc.b2bUser);
      cdc.restoreUserLastName(cdc.b2bUser);
    });
  });

  describe('Update profile without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update profile with native UI', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      cdc.updateUserProfileWithoutScreenset();
      cdc.verifyProfileUpdateSuccess(cdc.b2bUser);
      cdc.restoreUserLastName(cdc.b2bUser);
    });
  });

  describe('Update email without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update email', () => {
      cy.selectUserMenuOption({
        option: 'Email Address',
      });

      cdc.updateEmailWithoutScreenset(cdc.updatedEmail, cdc.b2bUser.password);
      cdc.verifyUpdateEmailSuccess(
        cdc.updatedEmail,
        cdc.b2bUser.password,
        cdc.b2bUser.fullName
      );
      cdc.restoreUserEmail(cdc.b2bUser);
    });
  });

  describe('Update password without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update password in Native UI', () => {
      cy.selectUserMenuOption({
        option: 'Password',
      });

      cdc.updatePasswordWithoutScreenset(
        cdc.b2bUser.password,
        cdc.updatedPassword
      );
      cdc.verifyUpdatePasswordSuccess(
        cdc.b2bUser.email,
        cdc.updatedPassword,
        cdc.b2bUser.fullName
      );
      cdc.restoreUserPassword(cdc.b2bUser);
    });
  });

  describe('CDC My Account - Address Book', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should display a new address form when no address exists', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cy.get('cx-address-form').should('exist');
    });

    it('should show Add address in CDC', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cdc.addAddress(cdc.b2bUser);
      cdc.verifyAddAddressSuccess(cdc.b2bUser);
    });

    it('should edit the Address and save it in CDC', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cdc.updateAddress(newAddress);
      cdc.verifyUpdateAddressSuccess(newAddress);
    });

    it('should show delete the Address ', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cdc.deleteAddress();
      cdc.verifyDeleteAddressSuccess();
    });
  });

  // describe('My Account - Address Book', () => {
  //   viewportContext(['mobile', 'desktop'], () => {
  //     before(() => {
  //       cy.window().then((win) => win.sessionStorage.clear());
  //     });

  //     describe('address book test for anonymous user', () => {
  //       it('should redirect to login page for anonymous user', () => {
  //         cy.visit('/my-account/address-book');
  //         cy.location('pathname').should('contain', '/login');
  //       });
  //     });

  //     describe('address book test for logged in user', () => {
  //       before(() => {
  //         cy.requireLoggedIn();
  //         cy.reload();
  //         cy.visit('/');
  //         cy.selectUserMenuOption({
  //           option: 'Address Book',
  //         });
  //       });

  //       beforeEach(() => {
  //         cy.restoreLocalStorage();
  //       });

  //       it('should display a new address form when no address exists', () => {
  //         cy.get('cx-address-form').should('exist');
  //       });

  //       it('should create a new address', () => {
  //         fillShippingAddress(newAddress);
  //       });

  //       it('should display the newly added address card in the address book', () => {
  //         verifyNewAddress();
  //       });

  //       it('should edit the existing address', () => {
  //         cy.get('button').contains('Edit').click();
  //         cy.get('cx-address-form').within(() => {
  //           cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
  //           cy.get('[formcontrolname="firstName"]')
  //             .clear()
  //             .type(editedAddress.firstName);
  //           cy.get('[formcontrolname="lastName"]')
  //             .clear()
  //             .type(editedAddress.lastName);
  //           cy.get('[formcontrolname="phone"]').clear().type(editedAddress.phone);

  //           cy.get('button.btn-primary').click();
  //         });
  //       });

  //       it('should display the edited address card in the address book', () => {
  //         cy.get('cx-card').should('have.length', 1);
  //         assertAddressForm(editedAddress);
  //       });

  //       it('should add a second address', () => {
  //         const secondAddress = {
  //           ...newAddress,
  //           firstName: 'N',
  //           lastName: 'Z',
  //         };
  //         cy.get('button').contains(' Add new address ').click({ force: true });
  //         fillShippingAddress(secondAddress);
  //         cy.get('cx-card').should('have.length', 2);
  //       });

  //       it('should set the second address as the default one', () => {
  //         fetchAddressesInterceptor();
  //         cy.get('button').contains('Set as default').click();

  //         cy.wait('@fetchAddresses').its('response.statusCode').should('eq', 200);
  //         alerts
  //           .getSuccessAlert()
  //           .contains(
  //             `Address ${newAddress.address.line1} was successfully set as default`
  //           );
  //         const firstCard = cy.get('cx-card').first();
  //         firstCard.should('contain', '✓ DEFAULT');
  //         firstCard.should('contain', 'N Z');
  //       });

  //       it('should delete the existing address', () => {
  //         const firstCard = cy.get('cx-card').first();

  //         firstCard.within(() => {
  //           cy.get('button').contains('Delete').click();
  //         });

  //         cy.get('.cx-card-delete-msg').should(
  //           'contain',
  //           'Are you sure you want to delete this address?'
  //         );

  //         // click cancel
  //         cy.get('.btn-secondary').should('contain', 'Cancel');
  //         cy.get('.btn-secondary').click();
  //         cy.get('.cx-card-delete-msg').should('not.exist');

  //         // click delete
  //         cy.intercept({
  //           method: 'DELETE',
  //           pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
  //             'BASE_SITE'
  //           )}/users/*/addresses/*`,
  //           query: {
  //             lang: 'en',
  //             curr: 'USD',
  //           },
  //         }).as('deleteAddress');
  //         fetchAddressesInterceptor();

  //         const card = cy.get('cx-card').first();
  //         card.contains('Delete').click();
  //         cy.get('.cx-card-delete button.btn-primary').click();
  //         cy.wait('@deleteAddress').its('response.statusCode').should('eq', 200);
  //         cy.wait('@fetchAddresses').its('response.statusCode').should('eq', 200);
  //         alerts.getSuccessAlert().contains('Address deleted successfully!');

  //         cy.get('cx-card').should('have.length', 1);

  //         // verify remaining address is now the default one
  //         const defaultCard = cy.get('cx-card').first();
  //         defaultCard.should('contain', '✓ DEFAULT');
  //         defaultCard.should('contain', 'Baz Qux');
  //       });

  //       afterEach(() => {
  //         cy.saveLocalStorage();
  //       });

  //       after(() => {
  //         login.signOutUser();
  //       });
  //     });
  //   });

  //   function fetchAddressesInterceptor() {
  //     cy.intercept({
  //       method: 'GET',
  //       pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
  //         'BASE_SITE'
  //       )}/users/*/addresses`,
  //       query: {
  //         lang: 'en',
  //         curr: 'USD',
  //       },
  //     }).as('fetchAddresses');
  //   }
  // });
});
