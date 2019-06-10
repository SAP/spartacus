import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Language switch - address book page', () => {
  const addressBookPath = '/USD/my-account/address-book';
  const deutschName = 'Herr';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.server();
    cy.route(siteContextSelector.LANGUAGE_REQUEST).as('languages');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('address book page', () => {
    it('should change language in the url', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + addressBookPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE + addressBookPath
      );
    });

    it('should change language in the page', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + addressBookPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"]'
      ).ngSelect(deutschName);

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"] .ng-value-label'
      ).should('have.text', deutschName);
    });
  });
});
