import * as conflictDialog from '../../../helpers/product-configurator-conflict-dialog';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

const RB = 'radioGroup';
//const CBL = 'checkBoxList';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationVc.goToConfigurationPage(electronicsShop, testProduct);
    clickAllowAllFromBanner();
  });

  it('should follow the immediate conflict resolution process', () => {
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
});
