import * as login from '../../helpers/login';

const FAQ_HEADING = 'Frequently Asked Questions';

function headingContains(text: string) {
  cy.get('cx-breadcrumb h1').should('contain', text);
}

context('Closed Storefront', () => {
  context('public page', () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.cxConfig({
        routing: {
          protected: true,
          routes: {
            faq: {
              paths: ['faq'],
              protected: false,
            },
          },
        },
      });
    });

    it('should display for unauthorized user', () => {
      cy.visit('/faq');
      headingContains(FAQ_HEADING);
    });
  });

  context('protected page', () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.cxConfig({
        routing: {
          protected: true,
          routes: {
            faq: {
              paths: ['faq'],
            },
          },
        },
      });
    });

    it('should redirect to login page for unauthorized user', () => {
      cy.visit('/faq');
      cy.url().should('contain', '/login');
    });

    it('should redirect to the anticipated page after login', () => {
      login.registerUser();
      login.loginUser();
      headingContains(FAQ_HEADING);
    });

    it('should display for authorized user', () => {
      cy.visit('/faq');
      headingContains(FAQ_HEADING);
    });
  });
});
