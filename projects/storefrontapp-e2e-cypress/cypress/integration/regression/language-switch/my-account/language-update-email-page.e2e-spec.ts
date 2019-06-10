import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - update-email page', () => {
  const updateEmailPath = siteContextSelector.UPDATE_EMAIL_PATH;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('update-email page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(updateEmailPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(updateEmailPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});
