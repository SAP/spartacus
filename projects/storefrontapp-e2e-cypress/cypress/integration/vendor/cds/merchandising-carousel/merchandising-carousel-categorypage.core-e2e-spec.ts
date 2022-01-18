import { waitForCategoryPage } from '../../../../helpers/checkout-flow';
import {
  CURRENCY_JPY,
  CURRENCY_LABEL,
  LANGUAGE_LABEL,
} from '../../../../helpers/site-context-selector';
import {
  cdsHelper,
  strategyRequestAlias,
} from '../../../../helpers/vendor/cds/cds';
import * as merchandisingCarousel from '../../../../helpers/vendor/cds/merchandising-carousel';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

function testCategoryPage(
  categoryCode: string = merchandisingCarousel.filmCamerasCategoryCode,
  categoryPagePath: string = merchandisingCarousel.filmCamerasCategoryPagePath,
  containsConsentReference?: boolean
): void {
  const categoryPage = waitForCategoryPage(categoryCode, 'getCategory');

  cy.visit(
    `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}/${categoryPagePath}`
  );

  cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
    strategyRequestAlias,
    categoryCode,
    merchandisingCarousel.DEFAULT_LANGUAGE,
    undefined,
    containsConsentReference
  );
}

context('Merchandising Carousel - Category page', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });
  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    cdsHelper.allowInsecureCookies();
  });

  describe('without consent granted - normal category page', () => {
    beforeEach(() => {
      testCategoryPage();
    });

    it("should update the products' language when the storefront language is changed on a category page", () => {
      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.englishFilmProductText,
        merchandisingCarousel.japaneseFilmProductText
      );

      switchSiteContext(merchandisingCarousel.japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.filmCamerasCategoryCode,
        merchandisingCarousel.japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.japaneseFilmProductText,
        merchandisingCarousel.englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a category page", () => {
      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.dollarCurrencySymbol
      );

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.yenCurrencySymbol
      );
    });

    it('should request products filtered by additional facets when facets on a category page are changed', () => {
      merchandisingCarousel.applyFacet(
        'Brand',
        merchandisingCarousel.canonBrandName
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.filmCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        [`brand:${merchandisingCarousel.canonBrandCode}`]
      );
    });

    it('should ignore previous category page context when navigating back to the homepage', () => {
      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should ignore previous category page content when navigating to a different category page', () => {
      merchandisingCarousel.navigateToCategory(
        merchandisingCarousel.camcordersCategoryName,
        merchandisingCarousel.camcordersCategoryCode
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.camcordersCategoryCode
      );
    });

    it('should render products on a PDP page when a carousel item on a category page is clicked', () => {
      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });
  });
  describe('without consent granted - special category page', () => {
    beforeEach(() => {
      testCategoryPage(
        merchandisingCarousel.slrCategoryCode,
        merchandisingCarousel.slrNonProductListCategoryPagePath
      );
    });

    it("should update the products' language when the storefront language is changed on a non-product list category page", () => {
      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.englishFilmProductText,
        merchandisingCarousel.japaneseFilmProductText
      );

      switchSiteContext(merchandisingCarousel.japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.slrCategoryCode,
        merchandisingCarousel.japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.japaneseFilmProductText,
        merchandisingCarousel.englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a non-product list category page", () => {
      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.dollarCurrencySymbol
      );

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.yenCurrencySymbol
      );
    });

    it('should ignore previous non-product list category page context when navigating back to the homepage', () => {
      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should render products on a PDP page when a carousel item on a non-product list category page is clicked', () => {
      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });
  });
});
