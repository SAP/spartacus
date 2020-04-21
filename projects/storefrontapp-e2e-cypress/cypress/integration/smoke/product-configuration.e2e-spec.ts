import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import * as productSearch from '../../helpers/product-search';
import { formats } from '../../sample-data/viewports';

const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const configurator = 'CPQCONFIGURATOR';

function goToConfigurationPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configurator}/product/entityKey/${testProduct}`
  );
}

function goToConfigurationOverviewPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configureOverview${configurator}/product/entityKey/${testProduct}`
  );
}

function goToProductDetailsPage(testProduct) {
  cy.visit(`electronics-spa/en/USD/product/${testProduct}/${testProduct}`);
}

function goToCart() {
  cy.visit('/electronics-spa/en/USD/cart');
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

    it('should be able to navigate from the overview page', () => {
      goToConfigurationOverviewPage(configurator, testProduct);
      configurationOverview.verifyConfigurationOverviewPageIsDisplayed();
      configurationOverview.navigateToConfigurationPage();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the cart', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.clickAddToCartButton();
      configuration.verifyOverviewPageIsDisplayed();
      cy.wait(1500);
      goToCart();
      cy.wait(1500);
      //We assume only one product is in the cart
      configuration.clickOnConfigureCartEntryButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      goToProductDetailsPage(testProduct);
      configuration.clickOnAddToCartButtonOnProductDetails();
      configuration.clickOnViewCartButtonOnProductDetails();
      cart.verifyCartNotEmpty();
      configuration.clickOnConfigureCartEntryButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });
  });

  describe('Configure Product', () => {
    it.skip('Image Attribute Types - Single Selection', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyAttributeIsDisplayed('ROOM_SIZE', 'radioGroup');

      configuration.selectAttribute(
        'COLOUR_HT',
        'single_selection_image',
        'WHITE'
      );

      configuration.verifyImageIsSelected(
        'COLOUR_HT',
        'single_selection_image',
        'WHITE'
      );

      configuration.selectAttribute(
        'COLOUR_HT',
        'single_selection_image',
        'TITAN'
      );

      configuration.verifyImageIsSelected(
        'COLOUR_HT',
        'single_selection_image',
        'TITAN'
      );
    });

    it('Checkboxes should be still selected after group change', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyAttributeIsDisplayed('CAMERA_MODE', 'radioGroup');
      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.selectAttribute('CAMERA_SD_CARD', 'checkBoxList', 'SDHC');
      cy.wait(1500);
      configuration.clickOnPreviousGroupButton('CAMERA_MODE', 'radioGroup');
      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.verifyCheckboxIsSelected('CAMERA_SD_CARD', 'SDHC');
    });
  });

  describe.skip('Group handling', () => {
    it('should navigate between groups', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.clickOnNextGroupButton('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnPreviousGroupButton('CAMERA_PIXELS', 'radioGroup');
    });

    it('should check if group buttons are clickable', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.verifyNextGroupButtonIsEnabled();
      configuration.verifyPreviousGroupButtonIsDisabled();

      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.verifyPreviousGroupButtonIsEnabled();
      configuration.clickOnNextGroupButton('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnNextGroupButton(
        'CAMERA_LENS_MANUFACTURER',
        'radioGroup'
      );
      configuration.clickOnNextGroupButton('CAMERA_OPTIONS', 'checkBoxList');
      configuration.verifyNextGroupButtonIsDisabled();
    });

    it('should navigate using the group menu', () => {
      goToProductDetailsPage(testProduct);
      configuration.verifyCategoryNavigationIsDisplayed();

      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyCategoryNavigationIsNotDisplayed();
      configuration.verifyGroupMenuIsDisplayed();
      configuration.verifyAttributeIsDisplayed('CAMERA_MODE', 'radioGroup');

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnGroup(1);
      configuration.verifyAttributeIsDisplayed('CAMERA_PIXELS', 'radioGroup');
    });

    //TODO: this test should be moved to integration/mobile/product-configuration folder
    it('should navigate using the group menu in mobile resolution', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyGroupMenuIsNotDisplayed();
      configuration.verifyHamburgerIsDisplayed();
      configuration.verifyAttributeIsDisplayed('CAMERA_MODE', 'radioGroup');

      configuration.clickHamburger();
      configuration.verifyGroupMenuIsDisplayed();

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed('CAMERA_DISPLAY', 'radioGroup');
    });

    it('should navigate using the previous and next button for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnNextGroupButton('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnPreviousGroupButton('PROJECTOR_TYPE', 'radioGroup');
    });

    it.skip('should navigate using the group menu for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed(
        'CPQ_HT_RECV_MODEL2',
        'dropdown'
      );
    });
  });
});
