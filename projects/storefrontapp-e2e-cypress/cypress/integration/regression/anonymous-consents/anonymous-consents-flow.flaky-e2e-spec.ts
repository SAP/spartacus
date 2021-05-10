import {
  changeLanguageTest,
  giveRegistrationConsentTest,
  moveAnonymousUserToLoggedInUser,
  movingFromAnonymousToRegisteredUser,
  sessionLogin,
  testAsLoggedInUser,
} from '../../../helpers/anonymous-consents';
import {
  LANGUAGES,
  LANGUAGE_REQUEST,
  stub,
} from '../../../helpers/site-context-selector';

const ANONYMOUS_BANNER = 'cx-anonymous-consent-management-banner';
const ANONYMOUS_OPEN_DIALOG = 'cx-anonymous-consent-open-dialog';
const ANONYMOUS_DIALOG = 'cx-anonymous-consent-dialog';

context('Anonymous consents flow', () => {
  describe('As anonymous user', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.visit('/');
    });

    it('should accept anonymous consents', () => {
      cy.get(ANONYMOUS_BANNER).find('.btn-primary').click();
      cy.get(ANONYMOUS_BANNER).should('not.be.visible');

      cy.get('cx-anonymous-consent-open-dialog').within(() => {
        cy.get('button').click({ force: true });
      });

      cy.get('input[type="checkbox"]').each(($match) => {
        cy.wrap($match).should('be.checked');
      });

      cy.get(`${ANONYMOUS_DIALOG} .cx-action-link`)
        .first()
        .click({ force: true });

      cy.get(ANONYMOUS_OPEN_DIALOG).within(() => {
        cy.get('button').click({ force: true });
      });

      cy.get('input[type="checkbox"]').each(($match) => {
        cy.wrap($match).should('not.be.checked');
      });
    });
  });

  describe.only('when registering a user and checking registration consent', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
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
