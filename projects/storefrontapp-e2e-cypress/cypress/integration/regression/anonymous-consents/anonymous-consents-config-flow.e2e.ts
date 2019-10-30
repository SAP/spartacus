import {
  anonoymousConsentConfig,
  anonymousConfigTestFlow,
  MARKETING_NEWSLETTER,
  PERSONALIZATION,
  sessionLogin,
  showAnonymousConfigTest,
  STORE_USER_INFORMATION,
} from '../../../helpers/anonymous-consents';

context('Anonymous consents - config flow', () => {
  describe('when config hides legalDescription is false and showAnonymousConsents is false', () => {
    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });

      anonoymousConsentConfig(MARKETING_NEWSLETTER, false, [], {
        showAnonymousConsents: false,
        hideConsents: [],
      });

      sessionLogin();
      cy.reload();
      cy.visit('/');
    });

    showAnonymousConfigTest();
  });

  describe.only('when config registerConsig is changed, requiredConsents and hideConsents exist, ', () => {
    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });

      anonoymousConsentConfig(PERSONALIZATION, true, [MARKETING_NEWSLETTER], {
        showAnonymousConsents: true,
        hideConsents: [STORE_USER_INFORMATION],
      });

      cy.reload();
      cy.visit('/');
    });

    anonymousConfigTestFlow();
  });

  describe('test3', () => {
    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });
  });

  describe('test4', () => {
    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });
  });
});
