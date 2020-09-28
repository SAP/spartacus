import * as cart from '../../helpers/cart';
import * as productSearch from '../../helpers/product-search';
import * as textfiledConfiguration from '../../helpers/textfield-configuration';

const testProduct = '1934793';
const ENGRAVED_TEXT = 'Engraved Text';
const HALLO = 'Hallo';

context('Textfield Configuration', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Navigate to Textfield Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      productSearch.searchForProduct(testProduct);
      textfiledConfiguration.clickOnConfigureButton();
      textfiledConfiguration.isConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the product details page', () => {
      textfiledConfiguration.goToProductDetailsPage(testProduct);
      textfiledConfiguration.clickOnConfigureButton();
      textfiledConfiguration.isConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the cart', () => {
      textfiledConfiguration.goToConfigurationPage(testProduct);
      textfiledConfiguration.isConfigurationPageIsDisplayed();
      textfiledConfiguration.addToCartAndVerify(testProduct);
      textfiledConfiguration.clickOnEditConfigurationLink(0);
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      textfiledConfiguration.goToProductDetailsPage(testProduct);
      textfiledConfiguration.clickOnAddToCartBtnOnPD();
      textfiledConfiguration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      textfiledConfiguration.clickOnEditConfigurationLink(0);
    });
  });

  describe('Configure Product and add to cart', () => {
    it('should enter value and add textfield product to cart', () => {
      textfiledConfiguration.goToConfigurationPage(testProduct);
      textfiledConfiguration.isConfigurationPageIsDisplayed();
      textfiledConfiguration.isAttributeDisplayed(ENGRAVED_TEXT);
      textfiledConfiguration.selectAttribute(ENGRAVED_TEXT, HALLO);
      textfiledConfiguration.addToCartAndVerify(testProduct);
    });

    it('should be able to update a configured product from the cart', () => {
      textfiledConfiguration.goToConfigurationPage(testProduct);
      textfiledConfiguration.isConfigurationPageIsDisplayed();
      textfiledConfiguration.addToCartAndVerify(testProduct);
      textfiledConfiguration.clickOnEditConfigurationLink(0);
      textfiledConfiguration.isAttributeDisplayed(ENGRAVED_TEXT);
      textfiledConfiguration.selectAttribute(ENGRAVED_TEXT, HALLO);
      textfiledConfiguration.addToCartAndVerify(testProduct);
    });
  });
});
