import { waitForPage } from '../../../../helpers/checkout-flow';
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

function testBrandPage(
  language: string = merchandisingCarousel.DEFAULT_LANGUAGE,
  currency: string = merchandisingCarousel.DEFAULT_CURRENCY
): void {
  const categoryPage = waitForPage('CategoryPage', 'getCategory');

  cy.visit(
    `/${language}/${currency}/${merchandisingCarousel.canonBrandPagePath}`
  );

  cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
    strategyRequestAlias,
    merchandisingCarousel.canonBrandCode,
    language
  );
}

context('Merchandising Carousel - Brand page', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });
  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    cdsHelper.allowInsecureCookies();
  });

  describe('without consent granted', () => {
    beforeEach(() => {
      testBrandPage();
    });

    it("should update the products' language when the storefront language is changed on a brand page", () => {
      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.englishFilmProductText,
        merchandisingCarousel.japaneseFilmProductText
      );

      switchSiteContext(merchandisingCarousel.japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
        strategyRequestAlias,
        merchandisingCarousel.canonBrandCode,
        merchandisingCarousel.japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.japaneseFilmProductText,
        merchandisingCarousel.englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a brand page", () => {
      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.dollarCurrencySymbol
      );

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.yenCurrencySymbol
      );
    });

    it('should request products filtered by additional facets when facets on a brand page are changed', () => {
      merchandisingCarousel.applyFacet(
        'Stores',
        merchandisingCarousel.chibaStoreName
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnBrandPage(
        strategyRequestAlias,
        merchandisingCarousel.canonBrandCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        [`availableInStores:${merchandisingCarousel.chibaStoreName}`]
      );
    });

    it('should ignore previous brand page context when navigating back to the homepage', () => {
      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should render products on a PDP page when a carousel item on a brand page is clicked', () => {
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
