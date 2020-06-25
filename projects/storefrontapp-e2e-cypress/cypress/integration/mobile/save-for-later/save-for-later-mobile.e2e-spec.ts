import * as saveForLater from '../../../helpers/save-for-later';
import { formats } from '../../../sample-data/viewports';

describe(`${
  formats.mobile.width + 1
}p resolution - Save for later - Anonymous user`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register and login first for anonymous user', () => {
    saveForLater.verifyAsAnonymous();
  });

  it('Should save items in saved for later list when logout', () => {
    saveForLater.verifyWhenLogBackIn();
  });
});

describe(`${
  formats.mobile.width + 1
}p resolution - Save for later -  Registered user`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });
  it('should save for later/move to cart for items', () => {
    saveForLater.verifyMoveToCart();
  });

  it('should keep item saved for later after placing an order', () => {
    saveForLater.verifyPlaceOrder();
  });

  it('should handle product with free gift in save for later', () => {
    saveForLater.verifyGiftProduct();
  });
});
