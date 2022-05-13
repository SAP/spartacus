import * as anonymousConsents from '../../../helpers/anonymous-consents';
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
      it(['consents'], 'should validate accept anonymous consents', () => {
        anonymousConsents.testAcceptAnonymousConsents();
      });
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
      it(
        ['consents'],
        'should validate give registration consent functionality',
        () => {
          anonymousConsents.giveRegistrationConsentTest();
        }
      );
    });

    describe('As a registered user', () => {
      before(() => {
        cy.visit('/');
      });
      it(
        ['consents'],
        'should validate moving from anonymous to registered user',
        () => {
          anonymousConsents.movingFromAnonymousToRegisteredUser();
        }
      );
    });

    describe('As a logged in user', () => {
      it(['consents'], 'should validate consents as logged in user', () => {
        anonymousConsents.testAsLoggedInUser();
      });
    });

    describe('On language change', () => {
      before(() => {
        cy.visit('/');
      });

      stub(LANGUAGE_REQUEST, LANGUAGES);

      it(['consents'], 'should validate change consents language', () => {
        anonymousConsents.changeLanguageTest();
      });
    });
  });
});
