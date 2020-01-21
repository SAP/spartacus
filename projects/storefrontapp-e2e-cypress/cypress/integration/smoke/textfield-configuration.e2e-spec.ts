import * as cart from '../../helpers/cart';
import * as productSearch from '../../helpers/product-search';
import * as configuration from '../../helpers/textfield-configuration';

const testProduct = '1978440_red';
const configurator = 'TEXTFIELD';

function goToConfigurationPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configurator}/product/entityKey/${testProduct}`
  );
}
function goToProductDetailsPage(testProduct) {
  cy.visit(`electronics-spa/en/USD/product/${testProduct}/${testProduct}`);
  cy.wait(2000);
}

context('Textfield Configuration', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Navigate to Textfield Configuration Page', () => {
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

  describe('Configure Product and add to cart', () => {
    it('should enter value and add textfield product to cart', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyAttributeIsDisplayed('Engraved Text');
      configuration.selectAttribute('Engraved Text', 'Hallo');
      configuration.clickAddToCartButton();
      cart.verifyCartNotEmpty();
      configuration.verifyTextfieldProductInCart(testProduct);
    });
  });
});
