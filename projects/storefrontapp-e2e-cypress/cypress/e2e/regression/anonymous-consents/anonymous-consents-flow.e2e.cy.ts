/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as anonymousConsents from '../../../helpers/anonymous-consents';
import {
  LANGUAGES,
  LANGUAGE_REQUEST,
  stub,
} from '../../../helpers/site-context-selector';
import { viewportContext } from '../../../helpers/viewport-context';

context('Anonymous consents flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });
    describe('As an anonymous user', () => {
      anonymousConsents.testAcceptAnonymousConsents();
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
      anonymousConsents.giveRegistrationConsentTest();
    });

    describe('As a registered user', () => {
      before(() => {
        cy.visit('/');
      });

      anonymousConsents.movingFromAnonymousToRegisteredUser();
    });

    describe('As a logged in user', () => {
      anonymousConsents.testAsLoggedInUser();
    });

    describe('On language change', () => {
      before(() => {
        cy.visit('/');
      });

      stub(LANGUAGE_REQUEST, LANGUAGES);

      anonymousConsents.changeLanguageTest();
    });
  });
});
