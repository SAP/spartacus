import {
  anonoymousConsentConfig,
  anonymousConfigTestFlow,
  displayLegalDescriptionInDialog,
  MARKETING_NEWSLETTER,
  noLegalDescriptionInDialog,
  PROFILE,
  sessionLogin,
  showAnonymousConfigTest,
  STORE_USER_INFORMATION,
} from '../../../helpers/anonymous-consents';

context('Anonymous consents - config flow', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
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

      sessionLogin();
      cy.visit('/');
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
      cy.visit('/');
    });

    anonymousConfigTestFlow();
  });
});
