/*
 * NOTE: Ids of actual products in the storefront need to be returned by the stub CDS strategy service
 * response as the products need to be retrieved from the spartacus product service
 */
export const strategyResponse = {
  metadata: {
    mixcardid: 'cypress-test-mixcard',
  },
  products: [
    {
      id: '779864',
      metadata: {
        'cypress-test-product-metadata': 'product-1-metadata-value',
      },
    },
    {
      id: '832382',
      metadata: {
        'cypress-test-product-metadata': 'product-2-metadata-value',
      },
    },
    {
      id: '779866',
      metadata: {
        'cypress-test-product-metadata': 'product-3-metadata-value',
      },
    },
  ],
};

function checkCarouselLevelMetadata($merchandisingCarousel) {
  cy.wrap($merchandisingCarousel)
    .get('.data-cx-merchandising-carousel')
    .should($merchandisingCarouselMetadata => {
      expect($merchandisingCarouselMetadata)
        .to.have.attr('data-cx-merchandising-carousel-slots')
        .equal(strategyResponse.products.length.toString());
      expect($merchandisingCarouselMetadata)
        .to.have.attr('data-cx-merchandising-carousel-mixcardid')
        .equal(strategyResponse.metadata.mixcardid);
    });
}

function checkCarouselItemsRendered($merchandisingCarousel) {
  cy.wrap($merchandisingCarousel)
    .get('.item')
    .should('have.length', strategyResponse.products.length)
    .each(($carouselItem, index) => {
      checkCarouselItemRendered($carouselItem, index);
    });
}

function checkCarouselItemRendered($carouselItem, index) {
  cy.wrap($carouselItem).within(() => {
    const product = strategyResponse.products[index];

    cy.get('a')
      .should('have.attr', 'href')
      .get('h4')
      .should('not.be.empty')
      .get('.price')
      .should('not.be.empty')
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
}

export function checkMerchandisingCarouselRendersProducts() {
  cy.get('cx-merchandising-carousel')
    /*
     * There could be multiple merchandising carousels on the page being used to test them,
     * but as we are stubbing the product retrieval response all of them will show the same products.
     * Limit our tests to the first carousel on the page by using first() and then within()
     */
    .first()
    .should('be.visible')
    .within($merchandisingCarousel => {
      checkCarouselLevelMetadata($merchandisingCarousel);
      checkCarouselItemsRendered($merchandisingCarousel);
    });
}
