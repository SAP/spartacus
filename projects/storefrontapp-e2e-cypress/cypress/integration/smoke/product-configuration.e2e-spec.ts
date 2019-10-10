import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const testProduct: string = 'CPQ_LAPTOP';

context('Product Configuration', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      productSearch.searchForProduct(testProduct);
      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the product details page', () => {
      //TODO: currently not possible
    });

    it('should be able to navigate from the cart', () => {
      //TODO: currently not possible
    });
  });
});
