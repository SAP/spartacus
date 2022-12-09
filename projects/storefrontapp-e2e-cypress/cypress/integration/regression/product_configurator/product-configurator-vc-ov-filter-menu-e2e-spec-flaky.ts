import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display sidebar with filter and menu on overview page', () => {
    clickAllowAllFromBanner();

    configurationOverviewVc.goToConfigOverviewPage(
      electronicsShop,
      testProduct
    );
    configurationOverviewVc.checkConfigOverviewSidebarDisplayed();
    configurationOverviewVc.checkConfigOverviewMenuDisplayed();

    configurationOverviewVc.configOverviewSwitchMenuFilter();
    configurationOverviewVc.checkConfigOverviewFilterDisplayed();

    configurationOverviewVc.configOverviewSwitchMenuFilter();
    configurationOverviewVc.checkConfigOverviewMenuDisplayed();
  });

  it('should be able filter the overview page', () => {
    clickAllowAllFromBanner();
    completeDigitalCameraConfiguration();

    // check num of attributes

    // apply different filters and check num of attributes
  });
});

function completeDigitalCameraConfiguration() {
  cy.intercept({
    method: 'PATCH',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/ccpconfigurator/*`,
  }).as('updateConfig');
  configurationVc.goToConfigurationPage(electronicsShop, testProduct);
  configuration.selectAttribute('CAMERA_MODE', 'radioGroup', 'P');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_COLOR', 'radioGroup', 'BLACK');
  cy.wait('@updateConfig');

  configuration.clickOnNextBtn('Specification');
  configuration.selectAttribute('CAMERA_PIXELS', 'radioGroup', 'P16');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_SENSOR', 'radioGroup', 'F');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_VIEWFINDER', 'radioGroup', 'R');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_SD_CARD', 'checkBoxList', 'SDHC');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_SD_CARD', 'checkBoxList', 'SDXC');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_SECOND_SLOT', 'radioGroup', 'Y');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_FORMAT_PICTURES', 'radioGroup', 'RAW');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_MAX_ISO', 'radioGroup', '25600');

  configuration.clickOnNextBtn('Display');
  configuration.selectAttribute('CAMERA_DISPLAY', 'radioGroup', 'P10');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_TOUCHSCREEN', 'radioGroup', 'Y');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_TILTABLE', 'radioGroup', 'Y');
  cy.wait('@updateConfig');

  configuration.clickOnNextBtn('Lens');
  configuration.selectAttribute(
    'CAMERA_LENS_MANUFACTURER',
    'radioGroup',
    'LEICA'
  );
  cy.wait('@updateConfig');
  configuration.selectAttribute(
    'CAMERA_LENS_TYPE',
    'radioGroup',
    'STANDARD_ZOOM_24_70'
  );
  cy.wait('@updateConfig');

  configuration.clickOnNextBtn('Options');
  configuration.selectAttribute('CAMERA_OPTIONS', 'checkBoxList', 'W');
  cy.wait('@updateConfig');
  configuration.selectAttribute('CAMERA_OPTIONS', 'checkBoxList', 'I');
  cy.wait('@updateConfig');

  configuration.navigateToOverviewPage();
}
