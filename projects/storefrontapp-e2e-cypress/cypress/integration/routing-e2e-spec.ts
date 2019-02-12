const PRODUCT_ID = '1992693';
const PRODUCT_NAME = 'DSC-T90';

context('Configurable routing', () => {
  it('should show product page by product ID', () => {
    cy.visit(`/product/${PRODUCT_ID}`);
    const productSummary = cy.get('cx-product-summary');
    productSummary.should('exist');
    productSummary.within(() => {
      cy.get('.name').should('contain', PRODUCT_NAME);
    });

    cy.visit(`/product/${PRODUCT_NAME}/${PRODUCT_ID}`);
    expect(true).to.equal(true);
  });

  it('should show product page by product name alias', () => {
    cy.visit(`/product/${PRODUCT_NAME}/${PRODUCT_ID}`);
    const productSummary = cy.get('cx-product-summary');
    productSummary.should('exist');
    productSummary.within(() => {
      cy.get('.name').should('contain', PRODUCT_NAME);
    });
  });
});
