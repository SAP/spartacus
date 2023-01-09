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
    conflictDialog.checkDisplayedConflict();

    //CHECK conflict Dialog

    //solve conflict 1

    //CHECK conflict Dialog

    //solve conflict 2

    //CHECK conflict Dialog CLOSED
  });
});
