context('Configurable routing', () => {
  const PRODUCT_ID = '1992693';
  const PRODUCT_NAME = 'DSC-T90';
  it('should show product page by product ID', () => {
    cy.visit(`/product/${PRODUCT_ID}`);
    cy.get('cx-product-summary').within(() => {
      cy.get('.name').should('contain', PRODUCT_NAME);
    });
  });

  it('should show product page by product name alias', () => {
    cy.visit(`/product/${PRODUCT_NAME}/${PRODUCT_ID}`);
    cy.get('cx-product-summary').within(() => {
      cy.get('.name').should('contain', PRODUCT_NAME);
    });
  });
});
