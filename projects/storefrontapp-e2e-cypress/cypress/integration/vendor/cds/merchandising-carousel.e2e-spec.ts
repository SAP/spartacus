import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
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
const dollarFilmPrice = 7.95;
const yenCurrencySymbol = '¥';
const yenFilmPrice = 670;
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
    cy.window().then(win => {
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

  it('should send another request to the strategy service, if consent is accepted, containing the consent-reference as a HTTP header', () => {
    testHomePage();

    merchandisingCarousel.acceptConsent();

    merchandisingCarousel.verifyRequestToStrategyService(strategyRequestAlias, {
      containsConsentReference: true,
    });

    merchandisingCarousel.navigateToCategory(camcordersCategoryName);
    merchandisingCarousel.verifyRequestToStrategyService(strategyRequestAlias, {
      category: camcordersCategoryCode,
      containsConsentReference: true,
    });
  });

  it('should render with products and metadata when displayed on the homepage', () => {
    testHomePage();
  });

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

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      dollarCurrencySymbol,
      dollarFilmPrice
    );

    switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      yenCurrencySymbol,
      yenFilmPrice
    );
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

  it('should render with products and metadata when displayed on a category page', () => {
    testCategoryPage();
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
      digitalCompactCamerasCategoryCode,
      japaneseLanguage
    );

    merchandisingCarousel.verifyFirstCarouselItemTextContent(
      japaneseFilmProductText,
      englishFilmProductText
    );
  });

  it("should update the products' currency when the storefront currency is changed on a category page", () => {
    testCategoryPage();

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      dollarCurrencySymbol,
      dollarFilmPrice
    );

    switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      yenCurrencySymbol,
      yenFilmPrice
    );
  });

  it('should request products filtered by additional facets when facets on a category page are changed', () => {
    testCategoryPage();

    merchandisingCarousel.applyFacet('Brand', sonyBrandName);

    merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
      strategyRequestAlias,
      digitalCompactCamerasCategoryCode,
      merchandisingCarousel.DEFAULT_LANGUAGE,
      [`brand:${sonyBrandCode}`]
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

  it('should render with products and metadata when displayed on a non-product list category page', () => {
    testCategoryPage(slrCategoryCode, slrNonProductListCategoryPagePath);
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

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      dollarCurrencySymbol,
      dollarFilmPrice
    );

    switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      yenCurrencySymbol,
      yenFilmPrice
    );
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

  it('should render with products and metadata when displayed on a brand page', () => {
    testBrandPage();
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
      sonyBrandCode,
      japaneseLanguage
    );

    merchandisingCarousel.verifyFirstCarouselItemTextContent(
      japaneseFilmProductText,
      englishFilmProductText
    );
  });

  it("should update the products' currency when the storefront currency is changed on a brand page", () => {
    testBrandPage();

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      dollarCurrencySymbol,
      dollarFilmPrice
    );

    switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      yenCurrencySymbol,
      yenFilmPrice
    );
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
      merchandisingCarousel.DEFAULT_LANGUAGE,
      [`category:${digitalCompactCamerasCategoryCode}`]
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

  it('should render with products and metadata when displayed on a PDP page', () => {
    testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);
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

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      dollarCurrencySymbol,
      dollarFilmPrice
    );

    switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

    merchandisingCarousel.verifyFirstCarouselItemPrice(
      yenCurrencySymbol,
      yenFilmPrice
    );
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
