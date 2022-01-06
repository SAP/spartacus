import * as aConsents from '../../../helpers/anonymous-consents';
import {
  LANGUAGES,
  LANGUAGE_REQUEST,
  stub,
} from '../../../helpers/site-context-selector';
import { viewportContext } from '../../../helpers/viewport-context';

context('Anonymous consents flow', () => {
  viewportContext(['mobile'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });
    describe('As an anonymous user', () => {
      aConsents.testAcceptAnonymousConsents();
    });
  });
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    describe('Registering a user', () => {
      aConsents.giveRegistrationConsentTest();
    });

    describe('As a registered user', () => {
      before(() => {
        cy.visit('/');
      });

      aConsents.movingFromAnonymousToRegisteredUser();
    });

    describe('As a logged in user', () => {
      aConsents.testAsLoggedInUser();
    });

    describe('On language change', () => {
      before(() => {
        cy.visit('/');
      });

      stub(LANGUAGE_REQUEST, LANGUAGES);

      aConsents.changeLanguageTest();
    });
  });
});
