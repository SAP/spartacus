import * as addressBook from '../../../helpers/address-book';
import { formats } from '../../../sample-data/viewports';

function addressBookTest() {
  describe('when anonymous user', () => {
    it('should NOT be able to open address book page if not logged in', () => {
      addressBook.accessPageAsAnonymous();
    });
  });

  describe('when logged in', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.visit('/');
      cy.get('cx-page-layout cx-login')
        .getByText('My Account')
        .click({ force: true });
      cy.get('nav')
        .getByText('Address Book')
        .click({ force: true });
    });

    it('should display a new address form when no address exists', () => {
      addressBook.displayAddressForm();
    });

    it('should create a new address', () => {
      addressBook.createNewAddress();
    });

    it('should display the newly added address card in the address book', () => {
      addressBook.verifyNewAddress();
    });

    it('should edit the existing address', () => {
      addressBook.editAddress();
    });

    it('should display the edited address card in the address book', () => {
      addressBook.verifyEditedAddress();
    });

    it('should add a second address', () => {
      addressBook.addSecondAddress();
    });

    it('should set the second address as the default one', () => {
      addressBook.setSecondAddressToDefault();
    });

    it('should delete the existing address', () => {
      addressBook.deleteExistingAddress();
    });
  });
}

describe('Address management page', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  addressBookTest();
});

describe(`${formats.mobile.width +
  1}p resolution - Address management page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  addressBookTest();
});
