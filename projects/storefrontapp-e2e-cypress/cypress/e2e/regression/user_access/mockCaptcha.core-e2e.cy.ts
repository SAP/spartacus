/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerWithCaptcha } from '../../../helpers/auth-forms';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';
import { clickHamburger } from '../../../helpers/homepage';
import { viewportContext } from '../../../helpers/viewport-context';
import { user } from '../../../sample-data/checkout-flow';

describe('Register', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    it('should register and redirect to login page (CXSPA-4006)', () => {
      cy.visit('/');
      cy.intercept('GET', /\.*\/basesites\?fields=.*/, (req) => {
        req.continue((res) => {
          res?.body?.baseSites?.forEach((baseSite) => {
            baseSite.captchaConfig = {
              enabled: true,
            };
          });
          res.send(res.body);
        });
      });
      cy.onMobile(() => {
        clickHamburger();
      });
      cy.findByText(/Sign in \/ Register/i).click();
      cy.get('cx-login-register').findByText('Register').click();
      cy.get('cx-captcha').should('exist');
      registerWithCaptcha(user);
      verifyGlobalMessageAfterRegistration();
    });
  });
});
