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

  it('should not save for later if user is anonymous', () => {
    saveForLater.verifyAsAnonymous();
  });

  it('Should keep items in saved for later list when user logs out', () => {
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

  it('should save for later and then send back to cart', () => {
    saveForLater.verifySaveForLaterAndBackToCart();
  });

  it('should save for later/move to cart for items', () => {
    saveForLater.verifySaveForLaterAndRemove();
  });

  it('should keep item saved for later after placing an order', () => {
    saveForLater.verifyPlaceOrder();
  });
});
