import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationOv from '../../../helpers/product-configurator-overview';
import * as configurationOvVc from '../../../helpers/product-configurator-overview-vc';
import * as restartDialog from '../../../helpers/product-configurator-restart-dialog';
import * as configurationVc from '../../../helpers/product-configurator-vc';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

const RB = 'radioGroup';

const commerceRelease: configurationVc.CommerceRelease = {};

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    clickAllowAllFromBanner();
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationVc.registerCreateConfigurationRoute();
    configurationOvVc.registerConfigurationOverviewRoute();
    configurationVc.checkCommerceRelease(
      electronicsShop,
      testProduct,
      commerceRelease
    );
  });

  /**
   * requires commerce 2211.4 with feature flag enabled:
   * 'toggle.sapproductconfigservices.getDefaultConfigurationEnhancements.enabled=true'
   */
  describe('should display restart dialog when a product bound configuration exists', () => {
    beforeEach(() => {
      createProductBoundConfiguration();
      navigateToConfigurationAndCheckDialog();
    });

    it('and should keep configuration on resume', () => {
      restartDialog.resume();

      restartDialog.checkIsClosed();
      configuration.checkValueSelected(RB, 'CAMERA_MODE', 'P');
      configuration.checkValueSelected(RB, 'CAMERA_COLOR', 'BLACK');
    });

    it('and should create a new default configuration on restart', () => {
      restartDialog.restart(commerceRelease.isPricingEnabled);

      restartDialog.checkIsClosed();
      configurationVc.navigateToOverviewPage();
      configurationOv.checkNumberOfAttributesDisplayed(0); // default config has no selections
      configuration.clickExitConfigurationBtn();
      configurationVc.clickOnConfigureBtnInCatalog(testProduct);
      restartDialog.checkIsClosed();
    });

    it('and navigate back to product details page without a decision on close', () => {
      restartDialog.close(testProduct);

      configurationVc.clickOnConfigureBtnInCatalog(testProduct);
      restartDialog.checkIsOpen();
      restartDialog.checkDialog();
    });
  });
});

function navigateToConfigurationAndCheckDialog() {
  configurationVc.clickOnConfigureBtnInCatalog(testProduct);
  restartDialog.checkIsOpen();
  restartDialog.checkDialog();
}

function createProductBoundConfiguration() {
  configurationVc.goToConfigurationPage(electronicsShop, testProduct);
  restartDialog.checkIsClosed();
  configurationVc.selectAttributeAndWait(
    'CAMERA_MODE',
    RB,
    'P',
    commerceRelease.isPricingEnabled
  );
  configurationVc.selectAttributeAndWait(
    'CAMERA_COLOR',
    RB,
    'BLACK',
    commerceRelease.isPricingEnabled
  );
  configuration.clickExitConfigurationBtn();
}
