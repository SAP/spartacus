/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updatePassword from '../../../helpers/update-password';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Password', () => {
  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );
    updatePassword.testUpdatePasswordLoggedInUser();
  });
});
