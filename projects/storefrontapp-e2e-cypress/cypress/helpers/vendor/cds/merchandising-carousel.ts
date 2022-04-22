import {
  CURRENCY_USD,
  LANGUAGE_EN,
} from '../../../helpers/site-context-selector';
import {
  waitForCategoryPage,
  waitForPage,
  waitForProductPage,
} from '../../checkout-flow';

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

export const japaneseLanguage = 'ja';
export const englishFilmProductText = 'Film';
export const japaneseFilmProductText = 'プ';
export const dollarCurrencySymbol = '$';
export const yenCurrencySymbol = '¥';
export const canonBrandName = 'Canon';
export const canonBrandCode = 'brand_10';
export const canonBrandPagePath = `Brands/${canonBrandName}/c/${canonBrandCode}`;
export const chibaStoreName = 'Chiba';
export const filmCamerasCategoryName = 'Film Cameras';
export const filmCamerasCategoryCode = '574';
export const filmCamerasCategoryPagePath = `Open-Catalogue/Cameras/Film-Cameras/c/${filmCamerasCategoryCode}`;
export const camcordersCategoryName = 'Camcorders';
export const camcordersCategoryCode = '584';
export const slrCategoryCode = '578';
export const slrNonProductListCategoryPagePath = `Open-Catalogue/Cameras/Digital-Cameras/Digital-SLR/c/${slrCategoryCode}`;
export const requestContainsConsentReference = true;
export const checkForCarouselClickEvent = true;

const merchandisingCarouselTagName = 'cx-merchandising-carousel';
const carouselViewedEventSchema = 'context/commerce/carouselViewed';
const carouselClickedEventSchema = 'context/commerce/carouselClicked';
export const carouselEventRequestAlias = 'carouselEventApiRequest';

/*
 * NOTE: Ids of actual products in the storefront need to be returned by the stub CDS strategy service
 * response as the products need to be retrieved from the spartacus product service
 */
export const STRATEGY_RESPONSE = {
  metadata: {
    mixcardId: 'cypress-test-mixcard',
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
  cy.wrap($merchandisingCarousel).within(() => {
    cy.get('.data-cx-merchandising-carousel').should(
      ($merchandisingCarouselMetadata) => {
        expect($merchandisingCarouselMetadata)
          .to.have.attr('data-cx-merchandising-carousel-slots')
          .equal(STRATEGY_RESPONSE.products.length.toString());
        expect($merchandisingCarouselMetadata)
          .to.have.attr('data-cx-merchandising-carousel-mixcardid')
          .equal(STRATEGY_RESPONSE.metadata.mixcardId);
      }
    );
  });
}

function verifyCarouselItemRendered(
  $carouselItem: JQuery<HTMLElement>,
  index: number
): void {
  const product = STRATEGY_RESPONSE.products[index];

  cy.wrap($carouselItem).within(() => {
    cy.get('.data-cx-merchandising-product').should(($productMetadata) => {
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

    cy.get('a').within(() => {
      cy.root().should('have.attr', 'href');
      cy.get('h4').should('not.be.empty');
      cy.get('.price').should('not.be.empty');
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
  cy.get(merchandisingCarouselTagName)
    /*
     * There could be multiple merchandising carousels on the page being used to test them,
     * but as we are stubbing the product retrieval response all of them will show the same products.
     * Limit our tests to the first carousel on the page by using first() and then within()
     */
    .first()
    .should('be.visible')
    .within(($merchandisingCarousel) => {
      verifyCarouselLevelMetadata($merchandisingCarousel);
      verifyCarouselItemsRendered($merchandisingCarousel);
      return cy.wrap($merchandisingCarousel);
    })
    /*
     * If we scroll immediately (i.e. before checking for the carousel item DOM elements) then sometimes
     * the carousel item observable has not finished emitting with the full product details, so not all of the products may be rendered.
     * This will then cause a view event to be sent without all the product skus, which then makes the tests flakey.
     * If we check the DOM for the carousel is as we expect first and then scroll it into view we get more reilable behaviour
     */
    .scrollIntoView({ offset: { top: 50, left: 50 } })
    .should('be.visible');
}

function verifyCarouselEvent(carouselEvent: any) {
  expect(carouselEvent['strategyId']).to.be.ok;
  expect(carouselEvent['carouselId']).to.be.ok;
  expect(carouselEvent['carouselName']).to.be.ok;
  expect(carouselEvent['mixCardId']).to.equal(
    STRATEGY_RESPONSE.metadata.mixcardId
  );
}

function verifyCarouselViewEvent(carouselEvent: any) {
  verifyCarouselEvent(carouselEvent);
  const expectedProductSkus = STRATEGY_RESPONSE.products.map(
    (product) => product.id
  );
  expect(carouselEvent['productSkus']).to.have.members(expectedProductSkus);
}

function verifyCarouselClickEvent(productSku: string, carouselEvent: any) {
  verifyCarouselEvent(carouselEvent);
  expect(carouselEvent['imageUrl']).to.be.ok;
  expect(carouselEvent['sku']).to.equal(productSku);
}

export function verifyRequestToStrategyService(
  requestAlias: string,
  strategyRequestContext: StrategyRequestContext
): void {
  cy.wait(`@${requestAlias}`).its('response.statusCode').should('eq', 200);

  cy.get<Cypress.WaitXHR>(`@${requestAlias}`).then(({ request }: any) => {
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
      ? expect(request.headers).to.have.property('consent-reference')
      : expect(request.headers).to.not.have.property('consent-reference');
  });
}

export function verifyMerchandisingCarouselRendersOnHomePage(
  strategyRequestAlias: string,
  language?: string,
  containsConsentReference?: boolean
): void {
  verifyRequestToStrategyService(strategyRequestAlias, {
    language,
    containsConsentReference,
  });

  verifyMerchandisingCarouselRendersProducts();
}

export function verifyMerchandisingCarouselRendersOnCategoryPage(
  strategyRequestAlias: string,
  categoryCode: string,
  language?: string,
  additionalFacets?: string[],
  containsConsentReference?: boolean
): void {
  verifyRequestToStrategyService(strategyRequestAlias, {
    language,
    category: categoryCode,
    facets: additionalFacets,
    containsConsentReference,
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
  cy.get('cx-facet .heading')
    .contains(facetGroup)
    .parents('cx-facet')
    .within(() => {
      cy.get('a.value').contains(facetName).click();
    });
}

export function verifyFirstCarouselItemTextContent(
  toContain: string,
  toNotContain: string
): void {
  cy.get(`${merchandisingCarouselTagName} .item h4`)
    .first()
    .should('contain.text', toContain)
    .and('not.contain.text', toNotContain);
}

export function verifyFirstCarouselItemPrice(currencySymbol: string): void {
  cy.get(`${merchandisingCarouselTagName} .item .price`)
    .first()
    .should('be.visible')
    .and('contain.text', currencySymbol);
}

export function clickOnCarouselItem(
  productId: string,
  checkForCarouselEvent?: boolean
): void {
  cy.get(
    `.data-cx-merchandising-product[data-cx-merchandising-product-id='${productId}'`
  )
    .parent()
    .within(() => {
      cy.root().should('be.visible');
      const productPage = waitForProductPage(productId, 'getProductPage');
      cy.get('a').click();
      cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
    });

  if (checkForCarouselEvent) {
    cy.waitForCarouselEvent(carouselClickedEventSchema).should((sentEvent) => {
      verifyCarouselClickEvent(productId, sentEvent);
    });
  }
}

export function navigateToHomepage(): void {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.get('cx-page-slot.SiteLogo').click();
  cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
}

export function navigateToCategory(
  categoryName: string,
  categoryCode: string
): void {
  const categoryPage = waitForCategoryPage(categoryCode, 'getCategory');
  cy.get('cx-category-navigation cx-generic-link a')
    .contains(categoryName)
    .click({ force: true });
  cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);
}

export function waitForCarouselViewEvent(): void {
  cy.waitForCarouselEvent(carouselViewedEventSchema).should((sentEvent) => {
    verifyCarouselViewEvent(sentEvent);
  });
}
