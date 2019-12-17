import * as saveForLater from '../../helpers/save-for-later';

describe('Save for later - guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register and login first for anonymous user', () => {
    saveForLater.verifySaveForLaterAsAnonymous();
  });
});

describe('Save for later - re-login customer', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });
  it('Should save save for later when logout', () => {
    saveForLater.verifySaveForLaterWhenRelogin();
  });
});

describe('Save for later - customer', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.reload();
    cy.visit('/');
  });

  it('should save for later and move to cart for items', () => {
    saveForLater.verifySaveForLater();
  });

  it('should merge cart into save for later', () => {
    saveForLater.verifyMergeCartIntoSaveForLater();
  });

  it('should merge save for later into cart', () => {
    saveForLater.verifyMergeSaveForLaterIntoCart();
  });

  it('should place order and keep save for later', () => {
    saveForLater.verifyGiftProductAndPlaceOrdr();
  });
});
