import { waitForProductPage } from '../../../../helpers/checkout-flow';
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

function testPDPPage(productId: string): void {
  const productPage = waitForProductPage(productId, 'getProductPage');

  cy.visit(
    `/${merchandisingCarousel.DEFAULT_LANGUAGE}/${merchandisingCarousel.DEFAULT_CURRENCY}/product/${productId}`
  );

  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
    strategyRequestAlias,
    productId,
    merchandisingCarousel.DEFAULT_LANGUAGE
  );
}

context('Merchandising Carousel - Product page', () => {
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
      testPDPPage(merchandisingCarousel.STRATEGY_RESPONSE.products[0].id);
    });

    it("should update the products' language when the storefront language is changed on a PDP page", () => {
      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.englishFilmProductText,
        merchandisingCarousel.japaneseFilmProductText
      );

      switchSiteContext(merchandisingCarousel.japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnPDPPage(
        strategyRequestAlias,
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id,
        merchandisingCarousel.japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.japaneseFilmProductText,
        merchandisingCarousel.englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on a PDP page", () => {
      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.dollarCurrencySymbol
      );

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.yenCurrencySymbol
      );
    });

    it('should ignore previous PDP page context when navigating back to the homepage', () => {
      merchandisingCarousel.navigateToHomepage();

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE
      );
    });

    it('should render products on a PDP page when a carousel item on a PDP page is clicked', () => {
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
