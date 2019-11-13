context('Merchandising Carousel', () => {
  before(() => {
    cy.visit('/');
  });

  it('should render products', () => {
    cy.get('cx-merchandising-carousel')
      .should('be.visible')
      .find('div.item')
      .should('have.length', 16);
  });
});
