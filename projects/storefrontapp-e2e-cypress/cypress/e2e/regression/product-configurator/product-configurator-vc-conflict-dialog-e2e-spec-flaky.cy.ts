import * as conflictDialog from '../../../helpers/product-configurator-conflict-dialog';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as configurationOvVc from '../../../helpers/product-configurator-overview-vc';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

const RB = 'radioGroup';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationVc.goToConfigurationPage(electronicsShop, testProduct);
    clickAllowAllFromBanner();
  });

  it('should follow the immediate conflict resolution process (CXSPA-1485)', () => {
    configurationVc.clickOnNextBtnAndWait('Specification');
    configurationVc.selectAttributeAndWait('CAMERA_VIEWFINDER', RB, 'E'); // CONFLICT 1
    configurationVc.selectAttributeAndWait('CAMERA_APERTURE', RB, 'F3\\.5'); // CONFLICT 2

    conflictDialog.checkIsClosed();
    configurationVc.selectAttributeAndWait('CAMERA_MAX_ISO', RB, '25600'); // Triggers the conflicts
    conflictDialog.checkIsOpen();
    conflictDialog.checkDisplayedConflict([
      { name: 'CAMERA_APERTURE', selectedValueNames: ['F3\\.5'], uiType: RB },
      { name: 'CAMERA_MAX_ISO', selectedValueNames: ['25600'], uiType: RB },
    ]);

    conflictDialog.selectAttributeAndWait('CAMERA_APERTURE', RB, 'F2\\.8'); // resolve CONFLICT 2
    conflictDialog.checkIsOpen();
    conflictDialog.checkDisplayedConflict([
      { name: 'CAMERA_VIEWFINDER', selectedValueNames: ['E'], uiType: RB },
      { name: 'CAMERA_MAX_ISO', selectedValueNames: ['25600'], uiType: RB },
    ]);

    conflictDialog.selectAttributeAndWait('CAMERA_VIEWFINDER', RB, 'R'); // resolve CONFLICT 1
    conflictDialog.checkIsClosed();
  });

  it('should restrict navigation when immediate conflict resolving is active (CXSPA-1485)', () => {
    configurationVc.clickOnNextBtnAndWait('Specification');
    configurationVc.selectAttributeAndWait('CAMERA_VIEWFINDER', RB, 'E');
    configurationVc.selectAttributeAndWait('CAMERA_MAX_ISO', RB, '25600');
    conflictDialog.checkIsOpen();

    conflictDialog.checkViewInConfigurationLinkNotDisplayed(
      'CAMERA_VIEWFINDER'
    );
    conflictDialog.checkViewInConfigurationLinkNotDisplayed('CAMERA_MAX_ISO');

    conflictDialog.close();
    configurationVc.checkConflictDetectedLinkNotDisplayed('CAMERA_VIEWFINDER');
    configurationVc.checkConflictDetectedLinkNotDisplayed('CAMERA_MAX_ISO');

    conflictDialog.checkIsClosed();
    configurationVc.clickOnGroup(0);
    conflictDialog.checkIsOpen();

    conflictDialog.close();
    conflictDialog.checkIsClosed();
    configurationVc.clickOnNextBtnAndWait();
    conflictDialog.checkIsOpen();

    conflictDialog.close();
    conflictDialog.checkIsClosed();
    configurationVc.navigateToOverviewPage();
    conflictDialog.checkIsClosed();
    configurationOvVc.navigateToConfigurationPage();
    conflictDialog.checkIsOpen();

    conflictDialog.close();
    conflictDialog.checkIsClosed();
    configurationVc.clickAddToCartBtn();
    conflictDialog.checkIsClosed();

    configuration.clickExitConfigurationBtn();
    conflictDialog.checkIsClosed();
  });
});
