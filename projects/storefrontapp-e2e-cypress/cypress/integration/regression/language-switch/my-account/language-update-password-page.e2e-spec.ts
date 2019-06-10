import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - update-password page', () => {
  const updatePasswordPath = '/my-account/update-password';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub();

  describe('update-password page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(updatePasswordPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(updatePasswordPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});
