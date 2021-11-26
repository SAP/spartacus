import { waitForPage } from '../../../../helpers/checkout-flow';
import { navigation } from '../../../../helpers/navigation';
import {
  cdsHelper,
  strategyRequestAlias,
} from '../../../../helpers/vendor/cds/cds';
import * as merchandisingCarousel from '../../../../helpers/vendor/cds/merchandising-carousel';
import { profileTagHelper } from '../../../../helpers/vendor/cds/profile-tag';

context('Merchandising Carousel - events', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });
  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    cdsHelper.allowInsecureCookies();
  });

  describe('with consent granted', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });

      cy.intercept({ method: 'POST', path: '/edge/clickstreamEvents' }).as(
        merchandisingCarousel.carouselEventRequestAlias
      );

      const homePage = waitForPage('homepage', 'getHomePage');
      navigation.visitHomePage({});

      cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);

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
        merchandisingCarousel.requestContainsConsentReference
      );

      merchandisingCarousel.waitForCarouselViewEvent();
    });

    it('should send carousel events to the data layer when the carousel is on a category page', () => {
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        {
          containsConsentReference:
            merchandisingCarousel.requestContainsConsentReference,
        }
      );

      merchandisingCarousel.navigateToCategory(
        merchandisingCarousel.filmCamerasCategoryName,
        merchandisingCarousel.filmCamerasCategoryCode
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.filmCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        undefined,
        merchandisingCarousel.requestContainsConsentReference
      );
      merchandisingCarousel.waitForCarouselViewEvent();
    });

    it('should send carousel events to the data layer when navigating from one category page to another category page', () => {
      merchandisingCarousel.verifyRequestToStrategyService(
        strategyRequestAlias,
        {
          containsConsentReference:
            merchandisingCarousel.requestContainsConsentReference,
        }
      );

      merchandisingCarousel.navigateToCategory(
        merchandisingCarousel.filmCamerasCategoryName,
        merchandisingCarousel.filmCamerasCategoryCode
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.filmCamerasCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        undefined,
        merchandisingCarousel.requestContainsConsentReference
      );

      merchandisingCarousel.waitForCarouselViewEvent();

      merchandisingCarousel.navigateToCategory(
        merchandisingCarousel.camcordersCategoryName,
        merchandisingCarousel.camcordersCategoryCode
      );

      merchandisingCarousel.verifyMerchandisingCarouselRendersOnCategoryPage(
        strategyRequestAlias,
        merchandisingCarousel.camcordersCategoryCode,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        undefined,
        merchandisingCarousel.requestContainsConsentReference
      );

      merchandisingCarousel.waitForCarouselViewEvent();
    });

    it('should send carousel events to the data layer when a carousel item is clicked on', () => {
      merchandisingCarousel.verifyMerchandisingCarouselRendersOnHomePage(
        strategyRequestAlias,
        merchandisingCarousel.DEFAULT_LANGUAGE,
        merchandisingCarousel.requestContainsConsentReference
      );

      merchandisingCarousel.clickOnCarouselItem(
        merchandisingCarousel.STRATEGY_RESPONSE.products[0].id,
        merchandisingCarousel.checkForCarouselClickEvent
      );
    });
  });
});
