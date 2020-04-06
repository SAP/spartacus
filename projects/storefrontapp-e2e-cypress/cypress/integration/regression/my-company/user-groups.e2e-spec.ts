describe('My Company - User Groups', () => {
  before(() => {
    cy.requireLoggedIn({
      user: 'linda.wolf@rustic-hw.com',
      registrationData: {
        firstName: 'Linda',
        lastName: 'Wolf',
        titleCode: '',
        password: '12341234',
        email: 'linda.wolf@rustic-hw.com',
      },
    });
    cy.visit(`/`);
  });

  it('should navigate to user groups', () => {
    cy.get('cx-navigation-ui.companyNavComponent').within(() => {
      cy.get('a')
        .contains('User Groups')
        .click({ force: true });
    });
    cy.get('cx-user-group-list').within(() => {
      cy.get('h3').should('contain.text', 'User Group Management');
    });
  });

  it('should sort table data', () => {});
});
