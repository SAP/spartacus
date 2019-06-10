import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - consent management page', () => {
  const consentManagementPath = siteContextSelector.CONSENT_MANAGEMENT_PATH;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('consent management page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(consentManagementPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(consentManagementPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});
