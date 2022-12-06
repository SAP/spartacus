/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { testEnableDisableNotification } from '../../../helpers/notification';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Notification preference', () => {
  viewportContext(['desktop'], () => {
    describe('Logged in user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        registerAndLogin();
        cy.visit('/');
      });

      testEnableDisableNotification();
    });
  });
});
