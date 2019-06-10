import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - close account page', () => {
  const closeAccountPath = '/my-account/close-account';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('close account page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(closeAccountPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(closeAccountPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});
