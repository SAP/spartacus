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

/**
 * Requires commerce 2211.4 with feature flag enabled:
 * 'toggle.sapproductconfigservices.getDefaultConfigurationEnhancements.enabled=true'
 */
context('Restart dialog for product configuration', () => {
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
    createProductBoundConfiguration();
    navigateToConfigurationAndCheckDialog();
  });

  it('should keep configuration on resume (CXSPA-1786)', () => {
    restartDialog.resume();

    restartDialog.checkIsClosed();
    configuration.checkValueSelected(RB, 'CAMERA_MODE', 'P');
    configuration.checkValueSelected(RB, 'CAMERA_COLOR', 'BLACK');
  });

  it('should create a new default configuration on restart (CXSPA-1786)', () => {
    restartDialog.restart(commerceRelease.isPricingEnabled);

    restartDialog.checkIsClosed();
    configurationVc.navigateToOverviewPage();
    configurationOv.checkNumberOfAttributesDisplayed(0); // default config has no selections
    configuration.clickExitConfigurationBtn();
    configurationVc.clickOnConfigureBtnInCatalog();
    restartDialog.checkIsClosed();
  });

  it('should navigate back to product details page without a decision on close (CXSPA-1786)', () => {
    restartDialog.close(testProduct);

    configurationVc.clickOnConfigureBtnInCatalog();
    restartDialog.checkIsOpen();
    restartDialog.checkDialog();
  });
});

function navigateToConfigurationAndCheckDialog() {
  configurationVc.clickOnConfigureBtnInCatalog();
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
