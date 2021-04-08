import * as saveForLater from '../../../helpers/save-for-later';
import { formats } from '../../../sample-data/viewports';

describe(`${
  formats.mobile.width + 1
}p resolution - Save for later - guest`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register and login first for anonymous user', () => {
    saveForLater.verifySaveForLaterAsAnonymous();
  });
});

describe(`${
  formats.mobile.width + 1
}p resolution - Save for later - re-login customer`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });
  it('Should save items in saved for later list when logout', () => {
    saveForLater.verifySaveForLaterWhenRelogin();
  });
});

describe(`${
  formats.mobile.width + 1
}p resolution - Save for later - customer`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('should save for later/move to cart for items', () => {
    saveForLater.verifySaveForLater();
  });

  it('should place order and keep save for later', () => {
    saveForLater.verifyPlaceOrder();
  });

  it('should handle product with free gift in save for later', () => {
    saveForLater.verifyGiftProduct();
  });
});
