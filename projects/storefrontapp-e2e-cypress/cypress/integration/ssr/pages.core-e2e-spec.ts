describe('SSR', () => {
  const plpUrl = '/Brands/Sony/c/brand_5';
  const pdpUrl = '/product/3965240/np-fv-70';

  beforeEach(() => {
    cy.intercept({ method: 'GET', url: '*.js' }, { body: '' });
  });

  function seoChecks() {
    cy.title().should('not.be.empty');
    cy.get('head meta[name="robots"]')
      .should('have.attr', 'content')
      .and('contains', 'INDEX')
      .and('contains', 'FOLLOW');
    cy.get('link[rel="canonical"]').should('have.attr', 'href');
    cy.get('script[id="json-ld"]')
      .should('not.be.empty')
      .and('have.attr', 'type')
      .and('eq', 'application/ld+json');
  }

  it('should render homepage', () => {
    cy.visit('/');

    seoChecks();

    cy.get('.header').within(() => {
      cy.get('cx-page-slot.SiteLogo').should('be.visible');
      cy.get('.searchbox').should('be.visible');
      cy.get('cx-mini-cart').should('be.visible');
    });
  });

  it('should render PLP', () => {
    cy.visit(plpUrl);
    seoChecks();
  });

  it('should render PDP', () => {
    cy.visit(pdpUrl);
    seoChecks();
  });
});
