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
        cy.intercept('GET', /\.*\/basesites\?fields=.*/, (req) => {
          req.continue((res) => {
            res?.body?.baseSites?.forEach((baseSite) => {
              baseSite.captchaConfig = {
                enabled: true,
                publicKey: Cypress.env('RECAPTCHA_PUBLIC_KEY'),
              };
            });
            res.send(res.body);
          });
        });
        registerWithCaptchaTabbingOrder(config.registerWithCaptcha);
      });
    });
  });
});
