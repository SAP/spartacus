import {
  CURRENCY_USD,
  LANGUAGE_EN,
} from '../../../helpers/site-context-selector';

interface StrategyRequestContext {
  language?: string;
  category?: string;
  productIds?: string[];
  facets?: string[];
  containsConsentReference?: boolean;
}

const site = 'electronics-spa';
export const DEFAULT_LANGUAGE = LANGUAGE_EN;
export const DEFAULT_CURRENCY = CURRENCY_USD;
const productDisplayCount = 10;

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

function verifyCarouselLevelMetadata(
  $merchandisingCarousel: JQuery<HTMLElement>
): void {
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
): void {
  const product = STRATEGY_RESPONSE.products[index];

  cy.wrap($carouselItem).within(() => {
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
): void {
  cy.wrap($merchandisingCarousel)
    .get('.item')
    .should('have.length', STRATEGY_RESPONSE.products.length)
    .each(($carouselItem, index) => {
      verifyCarouselItemRendered($carouselItem, index);
    });
}

function verifyMerchandisingCarouselRendersProducts(): void {
  cy.get('cx-merchandising-carousel')
    /*
     * There could be multiple merchandising carousels on the page being used to test them,
     * but as we are stubbing the product retrieval response all of them will show the same products.
     * Limit our tests to the first carousel on the page by using first() and then within()
     */
    .first()
    .should('be.visible')
    .within($merchandisingCarousel => {
      verifyCarouselLevelMetadata($merchandisingCarousel);
      verifyCarouselItemsRendered($merchandisingCarousel);
    });
}

export function verifyRequestToStrategyService(
  requestAlias: string,
  strategyRequestContext: StrategyRequestContext
): void {
  cy.wait(`@${requestAlias}`).then(request => {
    expect(request.url).to.contain(`site=${site}`);
    expect(request.url).to.contain(
      `language=${
        strategyRequestContext.language
          ? strategyRequestContext.language
          : DEFAULT_LANGUAGE
      }`
    );
    expect(request.url).to.contain(`pageSize=${productDisplayCount}`);

    if (strategyRequestContext.category) {
      expect(request.url).to.contain(
        `category=${strategyRequestContext.category}`
      );
    } else {
      expect(request.url).not.to.contain('category=');
    }

    if (strategyRequestContext.productIds) {
      expect(request.url).to.contain(
        `products=${strategyRequestContext.productIds}`
      );
    } else {
      expect(request.url).not.to.contain('products=');
    }

    if (strategyRequestContext.facets) {
      expect(request.url).to.contain(
        `facets=${strategyRequestContext.facets.join(':')}`
      );
    } else {
      expect(request.url).not.to.contain('facets=');
    }

    strategyRequestContext.containsConsentReference
      ? expect(request.requestHeaders).to.have.property('consent-reference')
      : expect(request.requestHeaders).to.not.have.property(
          'consent-reference'
        );
  });
}

export function verifyMerchandisingCarouselRendersOnHomePage(
  strategyRequestAlias: string,
  language?: string
): void {
  verifyRequestToStrategyService(strategyRequestAlias, { language });

  verifyMerchandisingCarouselRendersProducts();
}

export function verifyMerchandisingCarouselRendersOnCategoryPage(
  strategyRequestAlias: string,
  categoryCode: string,
  language?: string,
  additionalFacets?: string[]
): void {
  verifyRequestToStrategyService(strategyRequestAlias, {
    language,
    category: categoryCode,
    facets: additionalFacets,
  });

  verifyMerchandisingCarouselRendersProducts();
}

export function verifyMerchandisingCarouselRendersOnBrandPage(
  strategyRequestAlias: string,
  brandCode: string,
  language?: string,
  additionalFacets?: string[]
): void {
  verifyRequestToStrategyService(strategyRequestAlias, {
    language,
    category: brandCode,
    facets: additionalFacets,
  });

  verifyMerchandisingCarouselRendersProducts();
}

export function verifyMerchandisingCarouselRendersOnPDPPage(
  strategyRequestAlias: string,
  productId: string,
  language?: string
): void {
  const strategyRequestContext: StrategyRequestContext = {
    language,
  };
  if (productId) {
    strategyRequestContext.productIds = [productId];
  }

  verifyRequestToStrategyService(strategyRequestAlias, strategyRequestContext);

  verifyMerchandisingCarouselRendersProducts();
}

export function applyFacet(facetGroup: string, facetName: string): void {
  cy.get('.cx-facet-header')
    .contains(facetGroup)
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-label')
        .contains(facetName)
        .click();
    });
}

export function acceptConsent() {
  cy.get('.anonymous-consent-banner .cx-banner-buttons .btn-primary').click();
}

export function verifyFirstCarouselItemTextContent(
  toContain: string,
  toNotContain: string
): void {
  cy.get('cx-merchandising-carousel .item h4')
    .first()
    .should('contain.text', toContain)
    .and('not.contain.text', toNotContain);
}

export function verifyFirstCarouselItemPrice(
  currencySymbol: string,
  value: number
): void {
  cy.get('cx-merchandising-carousel .item .price')
    .first()
    .should('contain.text', currencySymbol)
    .and('contain.text', value);
}

export function clickOnCarouselItem(productId: string): void {
  cy.get(
    `.data-cx-merchandising-product[data-cx-merchandising-product-id='${productId}'`
  )
    .parent()
    .within(() => {
      cy.get('a').click();
    });
}

export function navigateToHomepage(): void {
  cy.get('cx-page-slot.SiteLogo').click();
}

export function navigateToCategory(categoryName: string): void {
  cy.get('cx-category-navigation cx-generic-link a')
    .contains(categoryName)
    .click({ force: true });
}
