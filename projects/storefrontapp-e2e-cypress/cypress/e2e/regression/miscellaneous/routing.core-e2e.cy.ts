context('Configurable routing', () => {
  const PRODUCT_ID = '1992693';
  const PRODUCT_NAME = 'DSC-T90';
  it('should show product page by product ID', () => {
    cy.visit(`/product/${PRODUCT_ID}`);
    cy.get('cx-breadcrumb').within(() => {
      cy.get('h1').should('contain', PRODUCT_NAME);
    });
  });

  it('should show product page by product name alias', () => {
    cy.visit(`/product/${PRODUCT_ID}/${PRODUCT_NAME}`);
    cy.get('cx-breadcrumb').within(() => {
      cy.get('h1').should('contain', PRODUCT_NAME);
    });
  });
});
