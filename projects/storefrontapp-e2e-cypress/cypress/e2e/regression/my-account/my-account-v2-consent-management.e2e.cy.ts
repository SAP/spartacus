/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  myAccountV2consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/my-account-v2/my-account-v2-consent-management';
import * as login from '../../../helpers/login';
import { generateMail, randomString } from '../../../helpers/user';
import * as loginHelper from '../../../helpers/my-account-v2/my-account-v2-login-helper';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { isolateTests } from '../../../support/utils/test-isolation';

describe('My Account - Consent Management(CXSPA-10780)', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('consent management test for anonymous user(CXSPA-10780)', () => {
      verifyAsAnonymous();
    });
  });

  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe(
      'consent management test for logged in user(CXSPA-10780)',
      { testIsolation: false },
      () => {
        isolateTests();
        before(() => {
          standardUser.registrationData.email = generateMail(
            randomString(),
            true
          );
          loginHelper.registerAndLogin(
            standardUser.registrationData.email,
            standardUser.registrationData.password
          );

          cy.visit('/');
          cy.selectUserMenuOption({
            option: 'Consent Management',
          });
        });

        beforeEach(() => {
          cy.restoreLocalStorage();
        });

        myAccountV2consentManagementTest();

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
