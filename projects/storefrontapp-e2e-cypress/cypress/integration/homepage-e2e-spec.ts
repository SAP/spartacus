context('Homepage', () => {
  before(() => {
    cy.visit('/');
  });

  it('should display title', () => {
    expect(cy.title).to.not.equal('');
  });

  it('should have site logo', () => {
    cy.get('cx-dynamic-slot.SiteLogo').should('be.visible');
  });

  it('should have splash banner', () => {
    cy.get('picture.ElectronicsHompageSplashBannerComponent').should('exist');
  });

  it('should have footer with footer navigation and notice', () => {
    const footer = cy.get('cx-dynamic-slot.Footer');
    footer.should('exist');
    footer.within(() => {
      cy.get('.navigation-elements').should('have.length', 3);
      cy.get('h1').should('have.length', 3);
      cy.get('cx-generic-link').should('exist');
      cy.get('.notice').should(
        'contain',
        'SAP SE or an SAP affiliate company. All rights reserved.'
      );
    });
  });
});
