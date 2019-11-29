const strategyResponse = {
  metadata: {
    mixcardid: 'cypress-test-mixcard',
  },
  products: [
    {
      id: 'cypress-test-product-1',
      name: 'Cypress Test Product 1',
      price: 10,
      metadata: {
        'cypress-test-product-metadata': 'product-1-metadata-value',
      },
    },
    {
      id: 'cypress-test-product-2',
      name: 'Cypress Test Product 2',
      price: 20,
      metadata: {
        'cypress-test-product-metadata': 'product-2-metadata-value',
      },
    },
    {
      id: 'cypress-test-product-3',
      name: 'Cypress Test Product 3',
      price: 30,
      metadata: {
        'cypress-test-product-metadata': 'product-3-metadata-value',
      },
    },
  ],
};

describe('Merchandsing Carousel', () => {
  it('should render with products and metadata', () => {
    cy.server();
    cy.route('GET', '/strategy/*/strategies/*/products**', strategyResponse);

    cy.visit('/');

    cy.get('cx-merchandising-carousel')
      .should('be.visible')
      .within(() => {
        cy.get('.data-cx-merchandising-carousel')
          .should($carousel => {
            expect($carousel)
              .to.have.attr('data-cx-merchandising-carousel-slots')
              .equal(strategyResponse.products.length.toString());
            expect($carousel)
              .to.have.attr('data-cx-merchandising-carousel-mixcardid')
              .equal(strategyResponse.metadata.mixcardid);
          })
          .get('.item')
          .should('have.length', strategyResponse.products.length)
          .each(($item, index) => {
            cy.wrap($item).within(() => {
              const product = strategyResponse.products[index];

              cy.get('a')
                .should('have.attr', 'href')
                .get('h4')
                .should('contain.text', product.name)
                .get('.price')
                .should('contain.text', product.price)
                .get('.data-cx-merchandising-product')
                .should($productMetadata => {
                  expect($productMetadata)
                    .to.have.attr('data-cx-merchandising-product-slot')
                    .equal((index + 1).toString());
                  expect($productMetadata)
                    .to.have.attr('data-cx-merchandising-product-id')
                    .equal(product.id);
                  expect($productMetadata)
                    .to.have.attr(
                      'data-cx-merchandising-product-cypress-test-product-metadata'
                    )
                    .equal(product.metadata['cypress-test-product-metadata']);
                });
            });
          });
      });
  });
});
