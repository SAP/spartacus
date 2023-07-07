/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { tabbingOrderConfig as config } from '../../../../helpers/accessibility/tabbing-order.config';
import { registerWithCaptchaTabbingOrder } from '../../../../helpers/accessibility/tabbing-order/register';

describe('Tabbing order for Captcha', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  context('Captcha', () => {
    context('Register page', () => {
      it('should allow to navigate to captcha with tab key', () => {
        registerWithCaptchaTabbingOrder(config.registerWithCaptcha);
      });
    });
  });
});
