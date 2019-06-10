import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - registration page', () => {
  const registerPath = siteContextSelector.REGISTRATION_PATH;
  const deutschName = siteContextSelector.TITLE_DE;

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('registration page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(registerPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(registerPath);

      cy.get('cx-register select')
        .select(deutschName)
        .should('have.value', 'mr');
    });
  });
});
