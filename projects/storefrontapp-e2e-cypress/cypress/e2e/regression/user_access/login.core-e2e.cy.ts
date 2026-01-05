/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';
import { visitLoginPage } from '../../../support/utils/login';

describe('Login', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.whenJDK17(() => {
        visitLoginPage();
      });
      cy.whenJDK21(() => {
        cy.visit('/login/register');
      });
      login.registerUserFromLoginPage();
    });

    it('should login and logout successfully', () => {
      visitLoginPage();
      login.loginUser();

      const tokenRevocationRequestAlias =
        login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
    });

    it('should not login with wrong password', () => {
      visitLoginPage();
      login.loginWithBadCredentialsFromLoginPage();
    });
  });
});
