import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as tabConfig } from '../../helpers/accessibility/tabbing-order.config';
import { clickAllowAllFromBanner } from '../../helpers/anonymous-consents';
import * as configuration from '../../helpers/product-configurator';
import * as configurationOverview from '../../helpers/product-configurator-overview';
import * as configurationVc from '../../helpers/product-configurator-vc';
/**
 * This suite is marked as flaky due to performance (synchronization) issues on
 * https://spartacus-devci767.eastus.cloudapp.azure.com:9002 that we analyze in
 * https://cxjira.sap.com/browse/TIGER-7252
 */

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

const containerSelectorConfigForm = 'main';
const containerSelectorOverviewForm = 'main';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_COLOR = 'CAMERA_COLOR';
const CAMERA_SD_CARD = 'CAMERA_SD_CARD';
const CAMERA_PIXELS = 'CAMERA_PIXELS';

// attribute types
const RADIO_GROUP = 'radioGroup';
const CHECKBOX_LIST = 'checkBoxList';

// attribute values
const CAMERA_MODE_PROFESSIONAL = 'P';
const CAMERA_COLOR_METALLIC = 'METALLIC';
const CAMERA_SD_CARD_SDXC = 'SDXC';
const CAMERA_PIXELS_P8 = 'P8';

// group names
const SPECIFICATION = 'Specification';

context('Product Configuration', () => {
  const commerceRelease: configurationVc.CommerceRelease = {};

  before(() => {
    configurationVc.checkCommerceRelease(
      electronicsShop,
      testProduct,
      commerceRelease
    );
  });

  beforeEach(() => {
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationVc.registerConfigurationPricingRoute();
    cy.visit('/');
  });

  describe('Product Config Tabbing', () => {
    it('should allow to navigate with tab key', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);

      verifyTabbingOrder(
        containerSelectorConfigForm,
        tabConfig.productConfigurationPage
      );

      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        RADIO_GROUP,
        CAMERA_MODE_PROFESSIONAL
      );
      configuration.navigateToOverviewPage();
      configurationVc.checkGlobalMessageNotDisplayed();
      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationVc.checkGhostAnimationNotDisplayed();
      if (commerceRelease.isAtLeast2211) {
        cy.log('Post 2211: product configuration overview page');
        verifyTabbingOrder(
          containerSelectorOverviewForm,
          tabConfig.productConfigurationOverviewPost2211
        ); //post 2211
      } else {
        cy.log('Pre 2211: product configuration overview page');
        verifyTabbingOrder(
          containerSelectorOverviewForm,
          tabConfig.productConfigurationOverview
        ); // pre 2211
      }
    });
  });

  describe('Product Config Keep Focus', () => {
    it('should keep focus after selection', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);

      cy.wait(configurationVc.CONFIG_PRICING_ALIAS);

      configurationVc.selectAttributeAndWait(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC
      );

      cy.wait(configurationVc.CONFIG_PRICING_ALIAS);

      configuration.checkFocus(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC
      );

      configurationVc.clickOnNextBtnAndWait(SPECIFICATION);
      configuration.checkFocus(CAMERA_PIXELS, RADIO_GROUP, CAMERA_PIXELS_P8);

      configurationVc.selectAttributeAndWait(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC
      );

      cy.wait(configurationVc.CONFIG_PRICING_ALIAS);

      configuration.checkFocus(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC
      );
    });
  });
});
