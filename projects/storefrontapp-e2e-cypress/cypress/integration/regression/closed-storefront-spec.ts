import { RoutingConfig } from '@spartacus/core';
import * as login from '../../helpers/login';

function isFAQ() {
  cy.get('cx-breadcrumb').should('contain', 'Frequently Asked Questions');
}

describe('Closed Storefront', () => {
  let config: RoutingConfig;

  beforeEach(() => {
    config = { routing: { protected: true } };
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should not redirect from public page to login for unauthorized user', () => {
    config.routing.routes = {
      faq: { paths: ['faq'], protected: false },
    };
    cy.cxConfig(config);
    cy.visit('/faq');
    isFAQ();
  });

  it('should redirect from protected page to login for unauthorized user', () => {
    cy.cxConfig(config);
    cy.visit('/faq');
    cy.url().should('contain', '/login');
    login.registerUser();
    login.loginUser();
    cy.url().should('contain', '/faq');
    isFAQ();
    login.signOutUser();
  });
});
