import { testGroupSkipperConfig } from '../../helpers/accessibility/group-skipper/group-skipper';
import {
  groupSkipperConfigNotLoggedIn,
  groupSkipperConfigMyAccount,
  groupSkipperConfigCheckout,
} from '../../helpers/accessibility/group-skipper/group-skipper.config';
import * as checkout from '../../helpers/checkout-flow';
import { user } from '../../sample-data/checkout-flow';

// context('Group Skipper - Checkout', () => {
//   before(() => {
//     cy.requireLoggedIn();
//     checkout.fillAddressFormWithCheapProduct();
//     checkout.chooseDeliveryMethod();
//     checkout.fillPaymentFormWithCheapProduct();
//   });

//   beforeEach(() => {
//     cy.restoreLocalStorage();
//   });

//   afterEach(() => {
//     cy.saveLocalStorage();
//   });

//   testGroupSkipperConfig(groupSkipperConfigCheckout);
// });

context('Group Skipper - Not Logged In', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  testGroupSkipperConfig(groupSkipperConfigNotLoggedIn);
});

context('Group Skipper - My Account', () => {
  before(() => {
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    cy.window().then(win => {
      const { auth } = JSON.parse(
        win.localStorage.getItem('spartacus-local-data')
      );
      cy.requireProductAddedToCart(auth).then(() => {
        cy.requireShippingAddressAdded(user.address, auth);
      });
    });
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  testGroupSkipperConfig(groupSkipperConfigMyAccount);
});
