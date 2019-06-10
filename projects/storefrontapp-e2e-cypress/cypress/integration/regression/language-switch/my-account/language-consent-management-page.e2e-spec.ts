import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Language switch - consent management page', () => {
  const consentManagementPath = '/USD/my-account/consents';

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

  describe('consent management page', () => {
    it('should change language in the url', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + consentManagementPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE + consentManagementPath
      );
    });

    xit('should change language in the page', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + consentManagementPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});
