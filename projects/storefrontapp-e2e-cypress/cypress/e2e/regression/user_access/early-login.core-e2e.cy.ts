/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';
import * as login from '../../../helpers/login';
import { visitLoginPage } from '../../../support/utils/login';

const FAQ_HEADING = 'Frequently Asked Questions';

function headingContains(text: string) {
  cy.get('cx-breadcrumb h1').should('contain', text);
}

context('Early login', () => {
  let config: RoutingConfig;

  beforeEach(() => {
    config = {
      routing: {
        protected: true, // enable routes protection
        routes: {
          faq: { paths: ['faq'] },
        },
      },
    };
  });

  context('public page', () => {
    beforeEach(() => {
      config.routing.routes.faq.protected = false;
      cy.cxConfig(config);
      cy.visit('/faq');
    });

    it('should display', () => {
      headingContains(FAQ_HEADING);
    });
  });

  context('protected page', () => {
    context('for unauthorized user', () => {
      beforeEach(() => {
        cy.cxConfig(config);
        cy.visit('/faq');
      });

      it('should redirect to login page and redirect back after sign in', () => {
        cy.url().should('contain', '/login');

        cy.whenJDK21(() => {
          // Conflict with JDK21 behavior: cannot access register from auth server login page
          cy.visit('/login/register');
        });

        login.registerUserFromLoginPage();
        cy.whenJDK21(() => {
          visitLoginPage();
        });

        login.loginUser();
        headingContains(FAQ_HEADING);
      });
    });

    context('for authorized user', () => {
      beforeEach(() => {
        cy.cxConfig(config);

        cy.visit('/');
        cy.requireLoggedIn();

        cy.visit('/faq');
      });

      it('should display', () => {
        headingContains(FAQ_HEADING);
      });
    });
  });
});
