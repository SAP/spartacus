import * as saveForLater from '../../../helpers/save-for-later';

describe('Save for later - Anonymous user', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  it('should register and login first for anonymous user', () => {
    saveForLater.verifyAsAnonymous();
  });

  it('Should save items in saved for later list when logout', () => {
    saveForLater.verifyWhenLogBackIn();
  });
});

describe('Save for later - Registered user', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  it.only('should save for later/move to cart for items', () => {
    saveForLater.verifyMoveToCart();
  });

  it('should place order and keep save for later', () => {
    saveForLater.verifyPlaceOrder();
  });

  it('should handle product with free gift in save for later', () => {
    saveForLater.verifyGiftProduct();
  });
});
