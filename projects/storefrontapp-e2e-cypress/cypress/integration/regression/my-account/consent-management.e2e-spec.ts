const CONSENT_MANAGEMENT_URL = '/my-account/consents';

describe('Consent management', () => {
  describe('when an anonymous user tries to access the page', () => {
    it('should be redirected to login page', () => {
      cy.visit(CONSENT_MANAGEMENT_URL);
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('when a user is logged in', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.visit(CONSENT_MANAGEMENT_URL);
    });

    it('should be able to navigate to the consent management page', () => {
      cy.get('cx-breadcrumb').within(() => {
        cy.get('h1').should('contain', 'Consent Management');
      });
    });

    it('should successfully give a consent', () => {
      cy.get('input[type="checkbox"]')
        .first()
        .should('not.be.checked');
      cy.get('input[type="checkbox"]')
        .first()
        .check();
      cy.get('input[type="checkbox"]')
        .first()
        .should('be.checked');
    });

    it('should successfully withdraw a consent', () => {
      cy.get('input[type="checkbox"]')
        .first()
        .should('be.checked');
      cy.get('input[type="checkbox"]')
        .first()
        .uncheck();
      cy.get('input[type="checkbox"]')
        .first()
        .should('not.be.checked');
    });
  });
});
