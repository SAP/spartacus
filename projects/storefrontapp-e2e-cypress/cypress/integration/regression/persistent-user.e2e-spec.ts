context('Check login', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
    cy.visit('/');
  });

  it('should login successfully', () => {
    cy.get('.cx-login-status__greet').should('contain', 'Test User');
  });
});
