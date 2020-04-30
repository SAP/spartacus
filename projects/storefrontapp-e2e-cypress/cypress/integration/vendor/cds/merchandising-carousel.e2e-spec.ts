import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
import { switchSiteContext } from '../../../support/utils/switch-site-context';
import {
  CURRENCY_JPY,
  CURRENCY_LABEL,
  LANGUAGE_LABEL,
} from './../../../helpers/site-context-selector';
const strategyRequestAlias = 'strategyProductsApiRequest';
const carouselEventRequestAlias = 'carouselEventApiRequest';
const japaneseLanguage = 'ja';
const englishFilmProductText = 'Film';
const japaneseFilmProductText = 'プ';
const dollarCurrencySymbol = '$';
const yenCurrencySymbol = '¥';
const canonBrandName = 'Canon';
const canonBrandCode = 'brand_10';
const canonBrandPagePath = `Brands/${canonBrandName}/c/${canonBrandCode}`;
const filmCamerasCategoryName = 'Film Cameras';
const filmCamerasCategoryCode = '574';
const filmCamerasCategoryPagePath = `Open-Catalogue/Cameras/Film-Cameras/c/${filmCamerasCategoryCode}`;
const camcordersCategoryName = 'Camcorders';
const camcordersCategoryCode = '584';
const slrCategoryCode = '578';
const slrNonProductListCategoryPagePath = `Open-Catalogue/Cameras/Digital-Cameras/Digital-SLR/c/${slrCategoryCode}`;
const chibaStoreName = 'Chiba';

const requestContainsConsentReference = true;
const checkForCarouselClickEvent = true;

function testHomePage(): void {
  cy.visit(
    `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}`
  );

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
    strategyRequestAlias,
    merchandisingCarousel.DEFAULT_LANGUAGE
  );
}

function testCategoryPage(
  categoryCode: string = filmCamerasCategoryCode,
  categoryPagePath: string = filmCamerasCategoryPagePath,
  containsConsentReference?: boolean
): void {
  cy.visit(
    `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}/${categoryPagePath}`
  );

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
    strategyRequestAlias,
    categoryCode,
    merchandisingCarousel.DEFAULT_LANGUAGE,
    undefined,
    containsConsentReference
  );
}

function testBrandPage(
  language: string = merchandisingCarousel.DEFAULT_LANGUAGE,
  currency: string = merchandisingCarousel.DEFAULT_CURRENCY
): void {
  cy.visit(`/${language}/${currency}/${canonBrandPagePath}`);

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
    strategyRequestAlias,
    canonBrandCode,
    language
  );
}

function testPDPPage(productId: string): void {
  cy.visit(
    `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}/product/${productId}`
  );

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
    strategyRequestAlias,
    productId,
    merchandisingCarousel.DEFAULT_LANGUAGE
  );
}

describe('Merchandising Carousel', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });
  beforeEach(() => {
    cy.server();
    cy.route(
      'GET',
      '/strategy/*/strategies/*/products**',
      merchandisingCarousel.STRATEGY_RESPONSE
    ).as('strategyProductsApiRequest');
    cy.cxConfig({
      cds: {
        profileTag: {
          allowInsecureCookies: true,
        },
      },
    });
  });

  describe('with consent granted', () => {
    beforeEach(() => {
      cy.route('POST', '/edge/clickstreamEvents').as(carouselEventRequestAlias);

      cy.visit(
        `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}`
      );
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        {}
      );
      profileTagHelper.grantConsent();
    });

    it('should send carousel events to the data layer when the carousel is on the homepage', () => {
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        requestContainsConsentReference
      );

      merchandisingCarousel.waitForCarouselViewEvent();
    });

    it('should send carousel events to the data layer when the carousel is on a category page', () => {
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        { containsConsentReference: requestContainsConsentReference }
      );

      merchandisingCarousel.navigateToCategory(filmCamerasCategoryName);
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        filmCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        undefined,
        requestContainsConsentReference
      );
      merchandisingCarousel.waitForCarouselViewEvent();
    });

    it('should send carousel events to the data layer when navigating from one category page to another category page', () => {
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        { containsConsentReference: requestContainsConsentReference }
      );

      merchandisingCarousel.navigateToCategory(filmCamerasCategoryName);
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        filmCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        undefined,
        requestContainsConsentReference
      );
      merchandisingCarousel.waitForCarouselViewEvent();

      merchandisingCarousel.navigateToCategory(camcordersCategoryName);
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        camcordersCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        undefined,
        requestContainsConsentReference
      );
      merchandisingCarousel.waitForCarouselViewEvent();
    });

    it('should send carousel events to the data layer when a carousel item is clicked on', () => {
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        requestContainsConsentReference
      );

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id,
        checkForCarouselClickEvent
      );
    });
  });

  describe('without consent granted', () => {
    it("should update the products' language when the storefront language is changed on the homepage", () => {
      testHomePage();

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on the homepage", () => {
      testHomePage();

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    it('should render products on a PDP page when a carousel item on the homepage is clicked', () => {
      testHomePage();

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    it("should update the products' language when the storefront language is changed on a category page", () => {
      testCategoryPage();

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        filmCamerasCategoryCode,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a category page", () => {
      testCategoryPage();

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    it('should request products filtered by additional facets when facets on a category page are changed', () => {
      testCategoryPage();

      merchandisingCarousel.applyFacet('Brand', canonBrandName);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        filmCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        [`brand:${canonBrandCode}`]
      );
    });

    it('should ignore previous category page context when navigating back to the homepage', () => {
      testCategoryPage();

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should ignore previous category page content when navigating to a different category page', () => {
      testCategoryPage();

      merchandisingCarousel.navigateToCategory(camcordersCategoryName);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        camcordersCategoryCode
      );
    });

    it('should render products on a PDP page when a carousel item on a category page is clicked', () => {
      testCategoryPage();

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    it("should update the products' language when the storefront language is changed on a non-product list category page", () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        slrCategoryCode,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a non-product list category page", () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    it('should ignore previous non-product list category page context when navigating back to the homepage', () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should render products on a PDP page when a carousel item on a non-product list category page is clicked', () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    it("should update the products' language when the storefront language is changed on a brand page", () => {
      testBrandPage();

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
        strategyRequestAlias,
        canonBrandCode,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a brand page", () => {
      testBrandPage();

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    it('should request products filtered by additional facets when facets on a brand page are changed', () => {
      testBrandPage();

      merchandisingCarousel.applyFacet('Stores', chibaStoreName);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
        strategyRequestAlias,
        canonBrandCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        [`availableInStores:${chibaStoreName}`]
      );
    });

    it('should ignore previous brand page context when navigating back to the homepage', () => {
      testBrandPage();

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should render products on a PDP page when a carousel item on a brand page is clicked', () => {
      testBrandPage();

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    it("should update the products' language when the storefront language is changed on a PDP page", () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a PDP page", () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    it('should ignore previous PDP page context when navigating back to the homepage', () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should render products on a PDP page when a carousel item on a PDP page is clicked', () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[1].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[1].id
      );
    });
  });
});
