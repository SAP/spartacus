context('Forgot Password Page', () => {
  before(() => {
    cy.visit('/forgot-password');
  });

  it('should display title', () => {
    cy.title().should('not.be.empty');
  });

  it('should submit email', () => {
    cy.get('cx-forgot-password form').within(() => {
      cy.get('[formcontrolname="userEmail"]').type('test@test.com');
      cy.get('button[type="submit"]').click();
    });
  });
});
