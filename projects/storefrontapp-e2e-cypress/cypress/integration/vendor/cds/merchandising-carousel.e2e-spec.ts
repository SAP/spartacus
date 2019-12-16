import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';

const strategyRequestAlias = 'strategyProductsApiRequest';
const sonyBrandName = 'Sony';
const sonyBrandCode = 'brand_5';
const sonyBrandPagePath = `Brands/${sonyBrandName}/c/${sonyBrandCode}`;
const digitalCompactCamerasCategoryName = 'Digital Compacts';
const digitalCompactCamerasCategoryCode = '576';
const digitalCompactCamerasCategoryPagePath = `Open-Catalogue/Cameras/Digital-Cameras/c/${digitalCompactCamerasCategoryCode}`;

function testCategoryPage() {
  cy.visit(digitalCompactCamerasCategoryPagePath);

  /*
   * We currently have a bug where a carousel on a category page causes 2 requests
   * to be made when the page is first loaded.
   * One without category as a facet and then one with category as a facet.
   *
   * Remove once duplicate request bugfix is implemented
   */
  merchandisingCarousel.verifyRequestToStrategyService(
    strategyRequestAlias,
    digitalCompactCamerasCategoryCode
  );

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
    strategyRequestAlias,
    digitalCompactCamerasCategoryCode
  );
}

function testBrandPage() {
  cy.visit(sonyBrandPagePath);

  /*
   * We currently have a bug where a carousel on a brand page causes 2 requests
   * to be made when the page is first loaded.
   * One without brand as a facet and then one with brand as a facet.
   *
   * Remove once duplicate request bugfix is implemented
   */
  merchandisingCarousel.verifyRequestToStrategyService(
    strategyRequestAlias,
    sonyBrandCode
  );

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
    strategyRequestAlias,
    sonyBrandCode
  );
}

describe('Merchandsing Carousel', () => {
  beforeEach(() => {
    cy.server();
    cy.route(
      'GET',
      '/strategy/*/strategies/*/products**',
      merchandisingCarousel.STRATEGY_RESPONSE
    ).as('strategyProductsApiRequest');
  });

  it('should render with products and metadata when displayed on the homepage', () => {
    cy.visit('/');

    merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
      strategyRequestAlias
    );
  });

  it('should render with products and metadata when displayed on a category page', () => {
    testCategoryPage();
  });

  it('should request products filtered by additional facets when facets on a category page are changed', () => {
    testCategoryPage();

    merchandisingCarousel.applyFacet('Brand', sonyBrandName);

    merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
      strategyRequestAlias,
      digitalCompactCamerasCategoryCode,
      [`brand:${sonyBrandCode}`]
    );
  });

  it('should ignore previous category page facet context when navigating back to the homepage', () => {
    testCategoryPage();

    // Navigate back to the homepage
    cy.get('cx-page-slot.SiteLogo').click();

    /*
     * There is currently a bug where navigating back from a page with facets
     * (e.g. a category page) to a page with no facets (e.g. the homepage) maintains
     * the facet context.
     *
     * Remove the additioanl facet parameter from the below method (invocation and implementation) once the bug has been fixed
     */
    merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
      strategyRequestAlias,
      [`category:${digitalCompactCamerasCategoryCode}`]
    );
  });

  it('should render with products and metadata when displayed on a brand page', () => {
    testBrandPage();
  });

  it('should request products filtered by additional facets when facets on a brand page are changed', () => {
    testBrandPage();

    merchandisingCarousel.applyFacet(
      'Category',
      digitalCompactCamerasCategoryName
    );

    merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
      strategyRequestAlias,
      sonyBrandCode,
      [`category:${digitalCompactCamerasCategoryCode}`]
    );
  });

  it('should ignore previous brand page facet context when navigating back to the homepage', () => {
    testBrandPage();

    // Navigate back to the homepage
    cy.get('cx-page-slot.SiteLogo').click();

    /*
     * There is currently a bug where navigating back from a page with facets
     * (e.g. a brand page) to a page with no facets (e.g. the homepage) maintains
     * the facet context.
     *
     * Remove the additioanl facet parameter from the below method (invocation and implementation) once the bug has been fixed
     */
    merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
      strategyRequestAlias,
      [`brand:${sonyBrandCode}`]
    );
  });
});
