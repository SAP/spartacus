import * as productSearchPricingFlow from '../../../helpers/product-search-pricing-flow';
import { formats } from '../../../sample-data/viewports';

function clickHamburger() {
  cy.get('cx-header [aria-label="Menu"]').click();
}

function waitForHomePage() {
  cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
    'exist'
  );
  clickHamburger();
}

context(
  `${formats.mobile.width + 1}p resolution - Product search pricing flow`,
  () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.visit('/');
    });
    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search with price', () => {
        waitForHomePage();

        productSearchPricingFlow.productSearch();
      });
    });
  }
);
