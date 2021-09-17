import * as cart from '../../helpers/cart';
import * as productSearch from '../../helpers/product-search';
import * as textfieldConfiguration from '../../helpers/textfield-configuration';

const electronicsShop = 'electronics-spa';
const testProduct = '1934793';
const ENGRAVED_TEXT = 'Engraved Text';
const HALLO = 'Hallo';

context('Textfield Configuration', () => {
  before(() => {
    cy.visit('/');
  });
  // TODO: GH-13777 Remove skip and Fix test failure
  describe.skip('Navigate to Textfield Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      productSearch.searchForProduct(testProduct);
      textfieldConfiguration.clickOnConfigureButton();
    });

    it('should be able to navigate from the product details page', () => {
      textfieldConfiguration.goToProductDetailsPage(
        electronicsShop,
        testProduct
      );
      textfieldConfiguration.clickOnConfigureButton();
    });

    it('should be able to navigate from the cart', () => {
      textfieldConfiguration.goToConfigurationPage(
        electronicsShop,
        testProduct
      );
      textfieldConfiguration.checkConfigurationPageIsDisplayed();
      textfieldConfiguration.addToCartAndVerify(electronicsShop, testProduct);
      textfieldConfiguration.clickOnEditConfigurationLink(0);
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      textfieldConfiguration.goToProductDetailsPage(
        electronicsShop,
        testProduct
      );
      textfieldConfiguration.clickOnAddToCartBtnOnPD();
      textfieldConfiguration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      textfieldConfiguration.clickOnEditConfigurationLink(0);
    });
  });
  // TODO: GH-13777 Remove skip and Fix test failure
  describe.skip('Configure Product and add to cart', () => {
    it('should enter value and add textfield product to cart', () => {
      textfieldConfiguration.goToConfigurationPage(
        electronicsShop,
        testProduct
      );
      textfieldConfiguration.checkConfigurationPageIsDisplayed();
      textfieldConfiguration.checkAttributeDisplayed(ENGRAVED_TEXT);
      textfieldConfiguration.selectAttribute(ENGRAVED_TEXT, HALLO);
      textfieldConfiguration.addToCartAndVerify(electronicsShop, testProduct);
    });

    it('should be able to update a configured product from the cart', () => {
      textfieldConfiguration.goToConfigurationPage(
        electronicsShop,
        testProduct
      );
      textfieldConfiguration.checkConfigurationPageIsDisplayed();
      textfieldConfiguration.addToCartAndVerify(electronicsShop, testProduct);
      textfieldConfiguration.clickOnEditConfigurationLink(0);
      textfieldConfiguration.checkAttributeDisplayed(ENGRAVED_TEXT);
      textfieldConfiguration.selectAttribute(ENGRAVED_TEXT, HALLO);
      textfieldConfiguration.addToCartAndVerify(electronicsShop, testProduct);
    });
  });
});
