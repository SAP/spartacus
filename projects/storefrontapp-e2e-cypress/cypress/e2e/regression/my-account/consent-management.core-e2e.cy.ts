/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/consent-management';
import * as login from '../../../helpers/login';
import { clearCacheCy12 } from '../../../helpers/utils-cypress12';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['mobile', 'desktop'], () => {
  describe('My Account - Consent Management', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('consent management test for anonymous user', () => {
      verifyAsAnonymous();
    });

    describe(
      'consent management test for logged in user',
      { testIsolation: false },
      () => {
        clearCacheCy12();
        before(() => {
          cy.requireLoggedIn();
          cy.reload();
          cy.visit('/');
          cy.selectUserMenuOption({
            option: 'Consent Management',
          });
        });

        beforeEach(() => {
          cy.restoreLocalStorage();
        });

        consentManagementTest();

        afterEach(() => {
          cy.saveLocalStorage();
        });

        after(() => {
          login.signOutUser();
        });
      }
    );
  });
});
