import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const testProduct: string = 'WCEM_DEPENDENCY_PC';
const configurator: string = 'CPQCONFIGURATOR';

function goToConfigurationPage(configurator, testProduct) {
  cy.visit(`/electronics-spa/en/USD/configure${configurator}/${testProduct}`);
}
function goToProductDetailsPage(testProduct) {
  cy.visit(`electronics-spa/en/USD/product/${testProduct}/${testProduct}`);
}

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
      goToProductDetailsPage(testProduct);
      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the cart', () => {
      //TODO: currently not possible
    });
  });

  describe('Configure Product', () => {
    it('Value should disappear on configuration change', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.verifyAttributeValueIsDisplayed(
        'WCEM_DP_MONITOR_MODEL',
        'radioGroup',
        '247E3LSU'
      );

      configuration.selectAttribute(
        'WCEM_DP_MONITOR_MNF',
        'radioGroup',
        'SAMSUNG'
      );

      configuration.verifyAttributeValueIsNotDisplayed(
        'WCEM_DP_MONITOR_MODEL',
        'radioGroup',
        '247E3LSU'
      );
    });

    it('Value should change on configuration change', () => {
      //TODO:
    });
  });
});
