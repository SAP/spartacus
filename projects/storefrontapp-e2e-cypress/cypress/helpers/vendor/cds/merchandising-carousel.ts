export const SITE = 'electronics-spa';
export const DEFAULT_LANGUAGE = 'en';
export const PRODUCT_DISPLAY_COUNT = 10;

/*
 * NOTE: Ids of actual products in the storefront need to be returned by the stub CDS strategy service
 * response as the products need to be retrieved from the spartacus product service
 */
export const STRATEGY_RESPONSE = {
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

function veifyCarouselLevelMetadata(
  $merchandisingCarousel: JQuery<HTMLElement>
) {
  cy.wrap($merchandisingCarousel)
    .get('.data-cx-merchandising-carousel')
    .should($merchandisingCarouselMetadata => {
      expect($merchandisingCarouselMetadata)
        .to.have.attr('data-cx-merchandising-carousel-slots')
        .equal(STRATEGY_RESPONSE.products.length.toString());
      expect($merchandisingCarouselMetadata)
        .to.have.attr('data-cx-merchandising-carousel-mixcardid')
        .equal(STRATEGY_RESPONSE.metadata.mixcardid);
    });
}

function verifyCarouselItemRendered(
  $carouselItem: JQuery<HTMLElement>,
  index: number
) {
  cy.wrap($carouselItem).within(() => {
    const product = STRATEGY_RESPONSE.products[index];

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

function verifyCarouselItemsRendered(
  $merchandisingCarousel: JQuery<HTMLElement>
) {
  cy.wrap($merchandisingCarousel)
    .get('.item')
    .should('have.length', STRATEGY_RESPONSE.products.length)
    .each(($carouselItem, index) => {
      verifyCarouselItemRendered($carouselItem, index);
    });
}

function verifyMerchandisingCarouselRendersProducts() {
  cy.get('cx-merchandising-carousel')
    /*
     * There could be multiple merchandising carousels on the page being used to test them,
     * but as we are stubbing the product retrieval response all of them will show the same products.
     * Limit our tests to the first carousel on the page by using first() and then within()
     */
    .first()
    .should('be.visible')
    .within($merchandisingCarousel => {
      veifyCarouselLevelMetadata($merchandisingCarousel);
      verifyCarouselItemsRendered($merchandisingCarousel);
    });
}

export function verifyRequestToStrategyService(
  requestAlias: string,
  categoryCode?: string,
  facets?: string[]
) {
  cy.wait(`@${requestAlias}`).then(request => {
    expect(request.url).to.contain(`site=${SITE}`);
    expect(request.url).to.contain(`language=${DEFAULT_LANGUAGE}`);
    expect(request.url).to.contain(`pageSize=${PRODUCT_DISPLAY_COUNT}`);

    if (categoryCode) {
      expect(request.url).to.contain(`category=${categoryCode}`);
    } else {
      expect(request.url).not.to.contain('category=');
    }

    if (facets) {
      expect(request.url).to.contain(`facets=${facets.join(':')}`);
    } else {
      expect(request.url).not.to.contain('facets=');
    }
  });
}

export function verifyMerchandisingCarouselRendersOnHomePage(
  strategyRequestAlias,
  additionalFacets?: string[]
) {
  verifyRequestToStrategyService(
    strategyRequestAlias,
    undefined,
    additionalFacets
  );

  verifyMerchandisingCarouselRendersProducts();
}

export function verifyMerchandisingCarouselRendersOnCategoryPage(
  strategyRequestAlias: string,
  categoryCode: string,
  additionalFacets?: string[]
) {
  const facets = [`category:${categoryCode}`];
  if (additionalFacets) {
    facets.push(...additionalFacets);
  }
  verifyRequestToStrategyService(strategyRequestAlias, categoryCode, facets);

  verifyMerchandisingCarouselRendersProducts();
}

export function verifyMerchandisingCarouselRendersOnBrandPage(
  strategyRequestAlias: string,
  brandCode: string,
  additionalFacets?: string[]
) {
  const facets = [`brand:${brandCode}`];
  if (additionalFacets) {
    facets.push(...additionalFacets);
  }
  verifyRequestToStrategyService(strategyRequestAlias, brandCode, facets);

  verifyMerchandisingCarouselRendersProducts();
}

export function applyFacet(facetGroup: string, facetName: string) {
  cy.get('.cx-facet-header')
    .contains(facetGroup)
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-label')
        .contains(facetName)
        .click();
    });
}
