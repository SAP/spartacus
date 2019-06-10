import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - address book page', () => {
  const addressBookPath = siteContextSelector.ADDRESS_BOOK_PATH;
  const deutschName = siteContextSelector.TITLE_DE;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('address book page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(addressBookPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(addressBookPath);

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"]'
      ).ngSelect(deutschName);

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"] .ng-value-label'
      ).should('have.text', deutschName);
    });
  });
});
