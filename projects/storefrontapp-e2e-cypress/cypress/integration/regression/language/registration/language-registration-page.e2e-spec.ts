import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Language switch - registration page', () => {
  beforeEach(() => {
    cy.server();
    cy.route(siteContextSelector.LANGUAGE_REQUEST).as('languages');
  });

  describe('registration page', () => {
    it('should change langage in the url', () => {
      cy.visit('/login/register');
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_JA, 'Language');

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_JA + '/USD/login/register'
      );

      switchSiteContext(siteContextSelector.LANGUAGE_EN, 'Language');
    });
  });
});
