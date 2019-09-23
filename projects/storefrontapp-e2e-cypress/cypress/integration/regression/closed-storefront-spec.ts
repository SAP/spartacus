import * as login from '../../helpers/login';

const headings = {
  FAQ: 'Frequently Asked Questions',
  TERMS_AND_CONDITIONS: 'Terms and Conditions',
};

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
      cy.visit('/faq');
    });

    it('should display for unauthorized user', () => {
      headingContains(headings.FAQ);
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
      cy.visit('/faq');
    });

    it('should redirect to login page for unauthorized user', () => {
      cy.url().should('contain', '/login');
    });

    it('should redirect to the anticipated page after login', () => {
      login.registerUser();
      login.loginUser();
      headingContains(headings.FAQ);
    });

    it('should display for authorized user', () => {
      cy.visit('/terms-and-conditions');
      headingContains(headings.TERMS_AND_CONDITIONS);
    });
  });
});
