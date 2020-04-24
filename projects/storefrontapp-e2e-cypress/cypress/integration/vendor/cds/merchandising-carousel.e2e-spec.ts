import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import * as profileTag from '../../../helpers/vendor/cds/profile-tag';
import { switchSiteContext } from '../../../support/utils/switch-site-context';
import {
  CURRENCY_JPY,
  CURRENCY_LABEL,
  LANGUAGE_LABEL,
} from './../../../helpers/site-context-selector';
const strategyRequestAlias = 'strategyProductsApiRequest';
const japaneseLanguage = 'ja';
const englishFilmProductText = 'Film';
const japaneseFilmProductText = 'プ';
const dollarCurrencySymbol = '$';
const yenCurrencySymbol = '¥';
const sonyBrandName = 'Sony';
const sonyBrandCode = 'brand_5';
const sonyBrandPagePath = `Brands/${sonyBrandName}/c/${sonyBrandCode}`;
const digitalCompactCamerasCategoryName = 'Digital Compacts';
const digitalCompactCamerasCategoryCode = '576';
const digitalCompactCamerasCategoryPagePath = `Open-Catalogue/Cameras/Digital-Cameras/c/${digitalCompactCamerasCategoryCode}`;
const camcordersCategoryName = 'Camcorders';
const camcordersCategoryCode = '584';
const slrCategoryCode = '578';
const slrNonProductListCategoryPagePath = `Open-Catalogue/Cameras/Digital-Cameras/Digital-SLR/c/${slrCategoryCode}`;

const carouselViewedEventName = 'CarouselViewed';
const requestContainsConsentReference = true;

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
  categoryCode: string = digitalCompactCamerasCategoryCode,
  categoryPagePath: string = digitalCompactCamerasCategoryPagePath
): void {
  cy.visit(
    `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}/${categoryPagePath}`
  );

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
    strategyRequestAlias,
    categoryCode,
    merchandisingCarousel.DEFAULT_LANGUAGE
  );
}

function testBrandPage(
  language: string = merchandisingCarousel.DEFAULT_LANGUAGE,
  currency: string = merchandisingCarousel.DEFAULT_CURRENCY
): void {
  cy.visit(`/${language}/${currency}/${sonyBrandPagePath}`);

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
    strategyRequestAlias,
    sonyBrandCode,
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
  afterEach(() => {
    cy.window().then((win) => {
      console.log('event layer contents: ', (<any>win).Y_TRACKING.eventLayer);
      (<any>win).Y_TRACKING.eventLayer = [];
    });
  });

  describe('with consent granted', () => {
    beforeEach(() => {
      cy.visit(
        `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}`
      );
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        {}
      );
      profileTag.grantConsent();
    });

    it('should send carousel events to the data layer when the carousel is on the homepage', () => {
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        requestContainsConsentReference
      );

      profileTag.verifyNumberOfEventsInDataLayer(carouselViewedEventName, 1);
    });

    xit('should send carousel events to the data layer when the carousel is on a category page', () => {});

    xit('should send carousel events to the data layer when navigating from one category page to another category page', () => {});

    xit('should send carousel events to the data layer when the carousel is on a non-product list category page', () => {});

    xit('should send carousel events to the data layer when the carousel is on a brand page', () => {});

    xit('should send carousel events to the data layer when the carousel is on a PDP page', () => {});
  });

  describe('without consent granted', () => {
    xit('should send another request to the strategy service, if consent is accepted, containing the consent-reference as a HTTP header', () => {
      testHomePage();

      profileTag.grantConsent();

      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        {
          containsConsentReference: requestContainsConsentReference,
        }
      );

      merchandisingCarousel.navigateToCategory(camcordersCategoryName);
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        {
          category: camcordersCategoryCode,
          containsConsentReference: true,
        }
      );

      // Now that consent is granted, carousel events should be sent to the data layer
      merchandisingCarousel.scrollToCarousel(true);
    });

    xit('should render with products and metadata and not send data layer events when displayed on the homepage', () => {
      testHomePage();

      // We should not send any events to the data layer as we have not given consent
      profileTag.verifyNumberOfEventsInDataLayer(carouselViewedEventName, 0);
    });

    xit("should update the products' language when the storefront language is changed on the homepage", () => {
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

    xit("should update the products' currency when the storefront currency is changed on the homepage", () => {
      testHomePage();

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    xit('should render products on a PDP page when a carousel item on the homepage is clicked', () => {
      testHomePage();

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    xit('should render with products and metadata when displayed on a category page', () => {
      testCategoryPage();
    });

    xit("should update the products' language when the storefront language is changed on a category page", () => {
      testCategoryPage();

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        digitalCompactCamerasCategoryCode,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    xit("should update the products' currency when the storefront currency is changed on a category page", () => {
      testCategoryPage();

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    xit('should request products filtered by additional facets when facets on a category page are changed', () => {
      testCategoryPage();

      merchandisingCarousel.applyFacet('Brand', sonyBrandName);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        digitalCompactCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        [`brand:${sonyBrandCode}`]
      );
    });

    xit('should ignore previous category page context when navigating back to the homepage', () => {
      testCategoryPage();

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    xit('should ignore previous category page content when navigating to a different category page', () => {
      testCategoryPage();

      merchandisingCarousel.navigateToCategory(camcordersCategoryName);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        camcordersCategoryCode
      );
    });

    xit('should render products on a PDP page when a carousel item on a category page is clicked', () => {
      testCategoryPage();

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    xit('should render with products and metadata when displayed on a non-product list category page', () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);
    });

    xit("should update the products' language when the storefront language is changed on a non-product list category page", () => {
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

    xit("should update the products' currency when the storefront currency is changed on a non-product list category page", () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    xit('should ignore previous non-product list category page context when navigating back to the homepage', () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    xit('should render products on a PDP page when a carousel item on a non-product list category page is clicked', () => {
      testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    xit('should render with products and metadata when displayed on a brand page', () => {
      testBrandPage();
    });

    xit("should update the products' language when the storefront language is changed on a brand page", () => {
      testBrandPage();

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        englishFilmProductText,
        japaneseFilmProductText
      );

      switchSiteContext(japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
        strategyRequestAlias,
        sonyBrandCode,
        japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        japaneseFilmProductText,
        englishFilmProductText
      );
    });

    xit("should update the products' currency when the storefront currency is changed on a brand page", () => {
      testBrandPage();

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    xit('should request products filtered by additional facets when facets on a brand page are changed', () => {
      testBrandPage();

      merchandisingCarousel.applyFacet(
        'Category',
        digitalCompactCamerasCategoryName
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
        strategyRequestAlias,
        sonyBrandCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        [`category:${digitalCompactCamerasCategoryCode}`]
      );
    });

    xit('should ignore previous brand page context when navigating back to the homepage', () => {
      testBrandPage();

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    xit('should render products on a PDP page when a carousel item on a brand page is clicked', () => {
      testBrandPage();

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id
      );
    });

    xit('should render with products and metadata when displayed on a PDP page', () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);
    });

    xit("should update the products' language when the storefront language is changed on a PDP page", () => {
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

    xit("should update the products' currency when the storefront currency is changed on a PDP page", () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);

      merchandisingCarousel.verifyFirstCarouselItemPrice(dollarCurrencySymbol);

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(yenCurrencySymbol);
    });

    xit('should ignore previous PDP page context when navigating back to the homepage', () => {
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);

      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    xit('should render products on a PDP page when a carousel item on a PDP page is clicked', () => {
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
