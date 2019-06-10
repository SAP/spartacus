import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - personal details page', () => {
  const personalDetailsPath = '/my-account/update-profile';
  const deutschName = 'Herr';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub();

  describe('personal details page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(personalDetailsPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(personalDetailsPath);

      cy.get('cx-update-profile-form select')
        .select(deutschName)
        .should('have.value', 'mr');
    });
  });
});
