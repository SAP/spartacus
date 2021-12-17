import {
  changeLanguageTest,
  giveRegistrationConsentTest,
  movingFromAnonymousToRegisteredUser,
  testAsLoggedInUser,
} from '../../../helpers/anonymous-consents';
import {
  LANGUAGES,
  LANGUAGE_REQUEST,
  stub,
} from '../../../helpers/site-context-selector';
import { viewportContext } from '../../../helpers/viewport-context';

const ANONYMOUS_BANNER = 'cx-anonymous-consent-management-banner';
const ANONYMOUS_OPEN_DIALOG = 'cx-anonymous-consent-open-dialog';
const ANONYMOUS_DIALOG = 'cx-anonymous-consent-dialog';

context('Anonymous consents flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    describe('As an anonymous user', () => {
      it('should accept anonymous consents', () => {
        cy.visit('/');

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

    describe('Registering a user', () => {
      giveRegistrationConsentTest();
    });

    describe('As a registered user', () => {
      before(() => {
        cy.visit('/');
      });

      movingFromAnonymousToRegisteredUser();
    });

    describe('As a logged in user', () => {
      testAsLoggedInUser();
    });

    describe('On language change', () => {
      before(() => {
        cy.visit('/');
      });

      stub(LANGUAGE_REQUEST, LANGUAGES);

      changeLanguageTest();
    });
  });
});
