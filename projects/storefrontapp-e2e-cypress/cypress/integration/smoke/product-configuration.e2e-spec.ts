import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import * as productSearch from '../../helpers/product-search';
import { formats } from '../../sample-data/viewports';

const testProduct = 'WCEM_DEPENDENCY_PC';
const testProductPricing = 'WEC_DRAGON_CAR';
const testProductMultiLevel = 'CPQ_HOME_THEATER';
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

    it('should be able to navigate from the cart', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.clickAddToCartButton();
      cy.wait(1500);
      goToCart();
      cy.wait(1500);
      //We assume only one product is in the cart
      configuration.clickOnConfigureCartEntryButton();
      configuration.verifyConfigurationPageIsDisplayed();
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

    it('Image Attribute Types - Multi Selection', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnGroup(4);

      configuration.verifyAttributeIsDisplayed(
        'WCEM_DP_RADIO_BUTTON',
        'radioGroup'
      );

      configuration.selectAttribute(
        'CPQ_HT_VIDEO_SOURCES',
        'multi_selection_image',
        'ATV'
      );

      configuration.selectAttribute(
        'CPQ_HT_VIDEO_SOURCES',
        'multi_selection_image',
        'AFT'
      );

      //Both Images should be selected in multi select type
      configuration.verifyImageIsSelected(
        'CPQ_HT_VIDEO_SOURCES',
        'multi_selection_image',
        'ATV'
      );
      configuration.verifyImageIsSelected(
        'CPQ_HT_VIDEO_SOURCES',
        'multi_selection_image',
        'AFT'
      );
    });

    it('Image Attribute Types - Single Selection', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnGroup(4);

      configuration.verifyAttributeIsDisplayed(
        'WCEM_DP_RADIO_BUTTON',
        'radioGroup'
      );

      configuration.selectAttribute(
        'CPQ_HT_SPK_MODEL',
        'single_selection_image',
        'YM_NS_F160'
      );

      configuration.selectAttribute(
        'CPQ_HT_SPK_MODEL',
        'single_selection_image',
        'YM_NS_C700'
      );

      //Only one image should be selected
      configuration.verifyImageIsNotSelected(
        'CPQ_HT_SPK_MODEL',
        'single_selection_image',
        'YM_NS_F160'
      );
      configuration.verifyImageIsSelected(
        'CPQ_HT_SPK_MODEL',
        'single_selection_image',
        'YM_NS_C700'
      );
    });

    it('Checkboxes should be still selected after group change', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyAttributeValueIsDisplayed(
        'WCEM_DP_MONITOR_MODEL',
        'radioGroup',
        '247E3LSU'
      );
      configuration.clickOnNextGroupButton('WCEM_DP_ACCESSORY', 'checkBoxList');
      configuration.selectAttribute(
        'WCEM_DP_ACCESSORY',
        'checkBoxList',
        'EXT_DD'
      );
      cy.wait(1500);
      configuration.clickOnPreviousGroupButton(
        'WCEM_DP_MONITOR_MODEL',
        'radioGroup'
      );
      configuration.clickOnNextGroupButton('WCEM_DP_ACCESSORY', 'checkBoxList');
      configuration.verifyCheckboxIsSelected('WCEM_DP_ACCESSORY', 'EXT_DD');
    });

    it('Value should change on configuration change', () => {
      //TODO:
    });
  });

  describe('Tab Navigation', () => {
    it('Navigate from Configuration to Overview Page', () => {
      goToConfigurationPage(configurator, testProductPricing);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.navigateToOverviewPage();
      configurationOverview.verifyConfigurationOverviewPageIsDisplayed();
    });

    it('Navigate from Overview to Configuration Page', () => {
      goToConfigurationOverviewPage(configurator, testProduct);
      configurationOverview.verifyConfigurationOverviewPageIsDisplayed();

      configurationOverview.navigateToConfigurationPage();
      configuration.verifyConfigurationPageIsDisplayed();
    });
  });

  describe('Pricing Summary', () => {
    it('Price should be displayed', () => {
      goToConfigurationPage(configurator, testProductPricing);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyTotalPrice('22,000.00');
    });

    it('Price should change on configuration change', () => {
      goToConfigurationPage(configurator, testProductPricing);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyTotalPrice('22,000.00');

      configuration.selectAttribute('WEC_DC_ENGINE', 'radioGroup', 'D');

      configuration.verifyTotalPrice('22,900.00');
    });
  });

  describe('Group handling', () => {
    it('should navigate between groups', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('WCEM_DP_EXT_DD', 'radioGroup');
      configuration.clickOnNextGroupButton('WCEM_DP_SOUND_CARD', 'radioGroup');
      configuration.clickOnPreviousGroupButton('WCEM_DP_EXT_DD', 'radioGroup');
    });

    it('should check if group buttons are clickable', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.verifyNextGroupButtonIsEnabled();
      configuration.verifyPreviousGroupButtonIsDisabled();

      configuration.clickOnNextGroupButton('WCEM_DP_EXT_DD', 'radioGroup');
      configuration.verifyPreviousGroupButtonIsEnabled();
      configuration.clickOnNextGroupButton('WCEM_DP_SOUND_CARD', 'radioGroup');
      configuration.clickOnNextGroupButton('WCEM_RO_REQ_INPUT', 'string');
      configuration.clickOnNextGroupButton(
        'WCEM_DP_RADIO_BUTTON',
        'radioGroup'
      );
      configuration.verifyNextGroupButtonIsDisabled();
    });

    it('should navigate using the group menu', () => {
      goToProductDetailsPage(testProduct);
      configuration.verifyCategoryNavigationIsDisplayed();

      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyCategoryNavigationIsNotDisplayed();
      configuration.verifyGroupMenuIsDisplayed();
      configuration.verifyAttributeIsDisplayed(
        'WCEM_DP_MONITOR_MNF',
        'radioGroup'
      );

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed(
        'WCEM_DP_SOUND_CARD',
        'radioGroup'
      );
      configuration.clickOnGroup(1);
      configuration.verifyAttributeIsDisplayed('WCEM_DP_EXT_DD', 'radioGroup');
    });

    it('should navigate using the group menu in mobile resolution', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyGroupMenuIsNotDisplayed();
      configuration.verifyHamburgerIsDisplayed();
      configuration.verifyAttributeIsDisplayed(
        'WCEM_DP_MONITOR_MNF',
        'radioGroup'
      );

      configuration.clickHamburger();
      configuration.verifyGroupMenuIsDisplayed();

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed(
        'WCEM_DP_SOUND_CARD',
        'radioGroup'
      );
    });

    it('should navigate using the previous and next button for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('CPQ_HT_INCLUDE_TV', 'label');
      configuration.clickOnNextGroupButton('CPQ_HT_RECV_MODEL2', 'dropdown');
      configuration.clickOnPreviousGroupButton('CPQ_HT_INCLUDE_TV', 'label');
    });

    it('should navigate using the group menu for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed(
        'CPQ_HT_RECV_MODEL2',
        'dropdown'
      );
    });
  });

  describe('Cart handling', () => {
    it('should add configurable product to cart', () => {
      goToConfigurationPage(configurator, testProductPricing);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.clickAddToCartButton();
      cy.wait(1500);
      cart.verifyCartNotEmpty();
      configuration.verifyOverviewPageIsDisplayed();
      configuration.clickAddToCartButton();
      configuration.verifyConfigurableProductInCart(testProductPricing);
    });

    it('Should be able to change configration from the cart', () => {
      //Product already in cart
      goToCart();
      cy.wait(1500);
      cart.checkProductInCart({ name: testProductPricing, price: 22000 }, 1);
      configuration.clickOnConfigureCartEntryButton();

      configuration.verifyConfigurationPageIsDisplayed();
      configuration.selectAttribute('WEC_DC_ENGINE', 'radioGroup', 'D');

      configuration.verifyTotalPrice('22,900.00');
      configuration.clickAddToCartButton(); //In this case it is the update cart button, the CSS Selector is the same, therefor we can use this method

      cy.wait(1500);
      cart.checkProductInCart({ name: testProductPricing, price: 22900 }, 1);
    });
  });
});
