/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as notification from '../../../helpers/notification';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My interests', () => {
  viewportContext(['desktop'], () => {
    describe('Customer', () => {
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.requireLoggedIn();
        cy.visit('/');
        notification.enableNotificationChannel();
      });

      it('should show/remove interest', () => {
        notification.verifyCustomerInterests();
      });

      it('should remove the subscrption in PDP', () => {
        notification.verifyRemovingCustomerInterestInPDP();
      });
    });
  });
});
