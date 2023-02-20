/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as aConsents from '../../../helpers/anonymous-consents';
import { viewportContext } from '../../../helpers/viewport-context';

context('Anonymous consents flow', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    describe('As an anonymous user', () => {
      aConsents.testAcceptAnonymousConsents();
    });
  });
});
