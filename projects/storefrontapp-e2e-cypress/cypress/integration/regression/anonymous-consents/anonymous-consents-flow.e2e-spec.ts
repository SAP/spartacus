import {
  changeLanguageTest,
  giveRegistrationConsentTest,
  moveAnonymousUserToLoggedInUser,
  movingFromAnonymousToRegisteredUser,
  sessionLogin,
  testAsAnonymousUser,
  testAsLoggedInUser,
} from '../../../helpers/anonymous-consents';
import {
  LANGUAGES,
  LANGUAGE_REQUEST,
  stub,
} from '../../../helpers/site-context-selector';

context('Anonymous consents flow', () => {
  describe('when anonymous user', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });

    testAsAnonymousUser();
  });

  describe('when registering a user and checking registration consent', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });
    giveRegistrationConsentTest();
  });

  describe('moving from the anonymous user to the registered user', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });

    movingFromAnonymousToRegisteredUser();
  });

  describe('moving from anonymous user to the logged in user', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      sessionLogin();
      cy.reload();
      cy.visit('/');
    });

    moveAnonymousUserToLoggedInUser();
  });

  describe('when a user is logged in', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      sessionLogin();
      cy.reload();
      cy.visit('/');
    });

    testAsLoggedInUser();
  });

  describe('when changing the language with consents', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.reload();
      cy.visit('/');
    });

    stub(LANGUAGE_REQUEST, LANGUAGES);

    changeLanguageTest();
  });
});
