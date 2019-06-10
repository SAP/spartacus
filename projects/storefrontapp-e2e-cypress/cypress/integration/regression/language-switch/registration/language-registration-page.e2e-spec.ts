import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Language switch - registration page', () => {
  const registerPath = '/USD/login/register';
  const deutschName = 'Herr';

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.server();
    cy.route(siteContextSelector.LANGUAGE_REQUEST).as('languages');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('registration page', () => {
    it('should change language in the url', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + registerPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE + registerPath
      );
    });

    it('should change language in the page', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + registerPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.get('cx-register select')
        .select(deutschName)
        .should('have.value', 'mr');
    });
  });
});
