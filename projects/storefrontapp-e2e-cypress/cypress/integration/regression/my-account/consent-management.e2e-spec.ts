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
    });

    beforeEach(() => {
      cy.visit(CONSENT_MANAGEMENT_URL);
    });

    it('should successfully give a consent', () => {
      const firstConsent = cy.get('input[type="checkbox"]').first();
      firstConsent.should('not.be.checked');
      firstConsent.click({ force: true });
      firstConsent.should('be.checked');
    });

    it('should successfully withdraw a consent', () => {
      const firstConsent = cy.get('input[type="checkbox"]').first();
      firstConsent.should('be.checked');
      firstConsent.click({ force: true });
      firstConsent.should('not.be.checked');
    });

    describe('when Done button is clicked', () => {
      it('should go back to a home page', () => {
        cy.get('button').click();
        cy.location('pathname').should('contain', '/');
        cy.get('.ElectronicsHompageSplashBannerComponent').should('exist');
      });
    });
  });
});
