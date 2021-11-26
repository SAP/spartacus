import { RoutingConfig } from '@spartacus/core';
import * as login from '../../../helpers/login';

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

        login.registerUserFromLoginPage();
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
