import { waitForPage } from '../../../../helpers/checkout-flow';
import { navigation } from '../../../../helpers/navigation';
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

function testHomePage(): void {
  const homePage = waitForPage('homepage', 'getHomePage');
  navigation.visitHomePage({});

  cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);

  merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
    strategyRequestAlias,
    merchandisingCarousel.DEFAULT_LANGUAGE
  );
}

context('Merchandising Carousel - Home page', () => {
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
      testHomePage();
    });

    it("should update the products' language when the storefront language is changed on the homepage", () => {
      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.englishFilmProductText,
        merchandisingCarousel.japaneseFilmProductText
      );

      switchSiteContext(merchandisingCarousel.japaneseLanguage, LANGUAGE_LABEL);

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.japaneseLanguage
      );

      merchandisingCarousel.verifyFirstCarouselItemTextContent(
        merchandisingCarousel.japaneseFilmProductText,
        merchandisingCarousel.englishFilmProductText
      );
    });

    it("should update the products' currency when the storefront currency is changed on the homepage", () => {
      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.dollarCurrencySymbol
      );

      switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);

      merchandisingCarousel.verifyFirstCarouselItemPrice(
        merchandisingCarousel.yenCurrencySymbol
      );
    });

    it('should render products on a PDP page when a carousel item on the homepage is clicked', () => {
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
