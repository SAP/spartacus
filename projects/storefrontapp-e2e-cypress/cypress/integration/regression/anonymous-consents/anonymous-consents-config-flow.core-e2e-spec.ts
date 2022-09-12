import {
  anonoymousConsentConfig,
  anonymousConfigTestFlow,
  displayLegalDescriptionInDialog,
  MARKETING_NEWSLETTER,
  noLegalDescriptionInDialog,
  PROFILE,
  seeBannerAsAnonymous,
  sessionLogin,
  showAnonymousConfigTest,
  STORE_USER_INFORMATION,
} from '../../../helpers/anonymous-consents';
import { waitForPage } from '../../../helpers/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Anonymous consents - config flow', () => {
  beforeEach(() => {
    clearAllStorage();
  });

  describe('when config legalDescription is false and showAnonymousConsents is false', () => {
    before(() => {
      anonoymousConsentConfig(
        MARKETING_NEWSLETTER,
        noLegalDescriptionInDialog,
        [],
        {
          showAnonymousConsents: false,
          hideConsents: [],
        }
      );

      const homePage = waitForPage('homepage', 'getHomePage');
      cy.visit('/');
      cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);

      // Make sure anonymous user is loaded
      cy.get('cx-login [role="link"]').should('be.visible');
      seeBannerAsAnonymous();

      // Make sure user is logged in after saving it in storage
      sessionLogin();
      cy.reload();
      cy.get('cx-login .cx-login-greet').should('be.visible');
    });

    showAnonymousConfigTest();
  });

  describe('when config registerConsig is changed, requiredConsents and hideConsents exist, ', () => {
    before(() => {
      anonoymousConsentConfig(
        PROFILE,
        displayLegalDescriptionInDialog,
        [MARKETING_NEWSLETTER],
        {
          showAnonymousConsents: true,
          hideConsents: [STORE_USER_INFORMATION],
        }
      );
      const homePage = waitForPage('homepage', 'getHomePage');
      cy.visit('/');
      cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
    });

    anonymousConfigTestFlow();
  });
});
