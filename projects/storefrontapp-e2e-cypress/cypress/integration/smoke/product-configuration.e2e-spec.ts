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
      configuration.verifyTotalPrice('€22,000.00');
    });

    it('Price should change on configuration change', () => {
      goToConfigurationPage(configurator, testProductPricing);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyTotalPrice('€22,000.00');

      configuration.selectAttribute('WEC_DC_ENGINE', 'radioGroup', 'D');

      configuration.verifyTotalPrice('€22,900.00');
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
      cy.window().then(win => win.sessionStorage.clear());
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

    it('should navigate using the previous and next button for muli level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('CPQ_HT_INCLUDE_TV', 'label');
      configuration.clickOnNextGroupButton('CPQ_HT_RECV_MODEL2', 'dropdown');
      configuration.clickOnPreviousGroupButton('CPQ_HT_INCLUDE_TV', 'label');
    });

    it('should navigate using the group menu for muli level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnGroup(3);
      configuration.clickOnGroup(1);
      configuration.clickOnNextGroupButton('CPQ_HT_RECV_MODEL2', 'dropdown');
    });
  });

  describe('Cart handling', () => {
    it('should add configurable product to cart', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.selectAttribute(
        'WCEM_DP_MONITOR_MNF',
        'radioGroup',
        'SAMSUNG'
      );
      configuration.clickAddToCartButton();
      cart.verifyCartNotEmpty();
      configuration.verifyOverviewPageIsDisplayed();
      configuration.clickAddToCartButton();
      configuration.verifyConfigurableProductInCart(testProduct);
    });
  });
});
