import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as configurationOverview from '../../../helpers/product-configurator-overview';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

const RB = 'radioGroup';
const CBL = 'checkBoxList';

const GROUP_ID_OPTIONS = '5';
const GROUP_ID_LENS = '4';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    configurationOverviewVc.registerConfigurationOverviewRoute();
    configurationOverviewVc.registerConfigurationOverviewUpdateRoute();
  });

  it('should display sidebar with filter and menu on overview page', () => {
    clickAllowAllFromBanner();

    configurationOverviewVc.goToConfigOverviewPage(
      electronicsShop,
      testProduct
    );
    configurationOverviewVc.checkSidebarDisplayed();
    configurationOverviewVc.checkMenuDisplayed();

    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkFilterDisplayed();

    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkMenuDisplayed();
  });

  it('should be able filter the overview page', () => {
    cy.viewport(1000, 660);
    clickAllowAllFromBanner();
    completeDigitalCameraConfiguration();
    configuration.navigateToOverviewPage();

    // no filter
    configurationOverviewVc.checkNumberOfMenuEntriesDisplayed(5);
    configurationOverview.checkNumberOfGroupHeadersDisplayed(5);
    configurationOverview.checkNumberOfAttributesDisplayed(17);
    configurationOverview.checkNumberOfAttributePricesDisplayed(4);

    // filter prices relevant
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.toggleAttributeFilterAndWait('price');
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkNumberOfMenuEntriesDisplayed(3);
    configurationOverview.checkNumberOfGroupHeadersDisplayed(3);
    configurationOverview.checkNumberOfAttributesDisplayed(4);
    configurationOverview.checkNumberOfAttributePricesDisplayed(4);

    // filter prices relevant and group Options
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.toggleGroupFilterAndWait(GROUP_ID_OPTIONS);
    configurationOverview.checkNumberOfGroupHeadersDisplayed(1);
    configurationOverview.checkNumberOfAttributesDisplayed(2);
    configurationOverview.checkNumberOfAttributePricesDisplayed(2);
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkNumberOfMenuEntriesDisplayed(1);

    // filter prices relevant and (group Options or group Lens)
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.toggleGroupFilterAndWait(GROUP_ID_LENS);
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkNumberOfMenuEntriesDisplayed(2);
    configurationOverview.checkNumberOfGroupHeadersDisplayed(2);
    configurationOverview.checkNumberOfAttributesDisplayed(3);
    configurationOverview.checkNumberOfAttributePricesDisplayed(3);

    // group Options or group Lens
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.removeFilterByNameAndWait('Price');
    configurationOverview.checkNumberOfGroupHeadersDisplayed(2);
    configurationOverview.checkNumberOfAttributesDisplayed(4);
    configurationOverview.checkNumberOfAttributePricesDisplayed(3);
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkNumberOfMenuEntriesDisplayed(2);

    // no filter
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.removeFilterByNameAndWait('Remove All');
    configurationOverview.checkNumberOfGroupHeadersDisplayed(5);
    configurationOverview.checkNumberOfAttributesDisplayed(17);
    configurationOverview.checkNumberOfAttributePricesDisplayed(4);
    configurationOverviewVc.toggleSidebar();
    configurationOverviewVc.checkNumberOfMenuEntriesDisplayed(5);

    // menu scroll test
    for (let ii: number = 0; ii < 5; ii++) {
      configurationOverviewVc.clickMenuItem(ii);
      configurationOverviewVc.checkViewPortScrolledToGroup(ii);
    }
  });
});

function completeDigitalCameraConfiguration() {
  configurationVc.registerConfigurationRoute();
  configurationVc.registerConfigurationUpdateRoute();
  configurationVc.goToConfigurationPage(electronicsShop, testProduct);
  configurationVc.selectAttributeAndWait('CAMERA_MODE', RB, 'P');
  configurationVc.selectAttributeAndWait('CAMERA_COLOR', RB, 'BLACK');

  configurationVc.clickOnNextBtnAndWait('Specification');
  configurationVc.selectAttributeAndWait('CAMERA_PIXELS', RB, 'P16');
  configurationVc.selectAttributeAndWait('CAMERA_SENSOR', RB, 'F');
  configurationVc.selectAttributeAndWait('CAMERA_VIEWFINDER', RB, 'R');
  configurationVc.selectAttributeAndWait('CAMERA_SD_CARD', CBL, 'SDHC');
  configurationVc.selectAttributeAndWait('CAMERA_SD_CARD', CBL, 'SDXC');
  configurationVc.selectAttributeAndWait('CAMERA_SECOND_SLOT', RB, 'Y');
  configurationVc.selectAttributeAndWait('CAMERA_FORMAT_PICTURES', RB, 'RAW');
  configurationVc.selectAttributeAndWait('CAMERA_MAX_ISO', RB, '25600');

  configurationVc.clickOnNextBtnAndWait('Display');
  configurationVc.selectAttributeAndWait('CAMERA_DISPLAY', RB, 'P10');
  configurationVc.selectAttributeAndWait('CAMERA_TOUCHSCREEN', RB, 'Y');
  configurationVc.selectAttributeAndWait('CAMERA_TILTABLE', RB, 'Y');

  configurationVc.clickOnNextBtnAndWait('Lens');
  configurationVc.selectAttributeAndWait(
    'CAMERA_LENS_MANUFACTURER',
    RB,
    'LEICA'
  );
  configurationVc.selectAttributeAndWait(
    'CAMERA_LENS_TYPE',
    RB,
    'STANDARD_ZOOM_24_70'
  );

  configurationVc.clickOnNextBtnAndWait('Options');
  configurationVc.selectAttributeAndWait('CAMERA_OPTIONS', CBL, 'W');
  configurationVc.selectAttributeAndWait('CAMERA_OPTIONS', CBL, 'I');
}
