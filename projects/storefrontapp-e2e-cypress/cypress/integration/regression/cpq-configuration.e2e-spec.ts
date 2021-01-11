import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const POWERTOOLS = 'powertools-spa';
const email = 'cpq03@sap.com';
const password = 'welcome';
const cpqUser = 'cpq03';

// UI types
const RB = 'radioGroup';
const CBL = 'checkBoxList';
const RB_P = 'radioGroupProduct';
const CBL_P = 'checkBoxListProduct';
const DDLB_P = 'dropdownProduct';

/******************************* */
/** Configurable Coffee-Machine  */
const PROD_CODE_COF = 'CONF_COFFEEMACHINE_3000';
/** Number of Cups per Day */
const ATTR_COF_CUPS = '2931';
/** 300-500 Cups per Day*/
const VAL_COF_CUPS_300 = '8841';
/** 500-1000 Cups per Day */
const VAL_COF_CUPS_500 = '8842';
/** Starbucks Mode */
const ATTR_COF_MODE = '2933';
/** Starbucks Mode*/
const VAL_COF_MODE = '8845';

/***************************** */
/** Configurable Camera Bundle */
const PROD_CODE_CAM = 'CONF_CAMERA_BUNDLE';
/** Camera Body */
const ATTR_CAM_BD = '2893';
/** Nikon D850 */
const VAL_CAM_BD_D850 = '8711';
/**  Canon EOS 80D */
const VAL_CAM_BD_EOS80D = '8712';
/** Memory Card */
const ATTR_CAM_MC = '2894';
/** Sandisk Memory Card */
const VAL_CAM_MC_128 = '8714';
/**  SanDisk Ultra 64GB SDHC */
const VAL_CAM_MC_64 = '8715';
/** Insurance */
const ATTR_CAM_INS = '2899';
/** No Option Selcted */
const VAL_NO_OPT_SEL = '0';
/** SanDisk Ultra 64GB SDHC */
const VAL_CB_INS_Y2 = '8735';

const GRP_CAM_MAIN = 'Main Components';
const GRP_CAM_ACC = 'Accessories';
const GRP_CAM_IAW = 'Insurance and Warranty';

// Attributes per Group Configurable Camera Bundle
const ATTR_NAMES = {
  GRP_CAM_MAIN: ['Camera Body', 'Memory Card', 'Lenses'],
  GRP_CAM_ACC: ['Tripod', 'Bag', 'Special Accessories'],
  GRP_CAM_IAW: [
    'Are you a professional photographer?',
    'Insurance',
    'Extended Warranty',
  ],
};

context('CPQ Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    configuration.checkLoadingMsgNotDisplayed();
    configuration.login(email, password, cpqUser);
    configuration.checkLoadingMsgNotDisplayed();
  });

  xdescribe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      cy.server();
      cy.route(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/suggestions?term=${PROD_CODE_CAM}*`
      );
      productSearch.searchForProduct(PROD_CODE_CAM);
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      configuration.goToPDPage(POWERTOOLS, PROD_CODE_CAM);
      configuration.clickOnConfigureBtnInCatalog();
    });
  });

  describe('UiTypes', () => {
    it('should support radio button attribute type', () => {
      configuration.goToPDPage(POWERTOOLS, PROD_CODE_COF);
      configuration.clickOnConfigureBtnInCatalog();

      configuration.checkAttributeDisplayed(ATTR_COF_CUPS, RB);

      configuration.selectAttribute(ATTR_COF_CUPS, RB, VAL_COF_CUPS_300);
      configuration.checkValueSelected(RB, ATTR_COF_CUPS, VAL_COF_CUPS_300);

      configuration.selectAttribute(ATTR_COF_CUPS, RB, VAL_COF_CUPS_500);
      configuration.checkValueSelected(RB, ATTR_COF_CUPS, VAL_COF_CUPS_500);
    });

    it('should support checkbox list attribute type', () => {
      configuration.goToPDPage(POWERTOOLS, PROD_CODE_COF);
      configuration.clickOnConfigureBtnInCatalog();

      configuration.checkAttributeDisplayed(ATTR_COF_MODE, CBL);
      configuration.checkValueNotSelected(CBL, ATTR_COF_MODE, VAL_COF_MODE);

      configuration.selectAttribute(ATTR_COF_MODE, CBL, VAL_COF_MODE);
      configuration.checkValueSelected(CBL, ATTR_COF_MODE, VAL_COF_MODE);

      configuration.selectAttribute(ATTR_COF_MODE, CBL, VAL_COF_MODE);
      configuration.checkValueNotSelected(CBL, ATTR_COF_MODE, VAL_COF_MODE);
    });

    it('should support single select (radio) bundle items', () => {
      configuration.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);

      configuration.checkAttributeDisplayed(ATTR_CAM_BD, RB_P);
      configuration.checkValueNotSelected(RB_P, ATTR_CAM_BD, VAL_CAM_BD_D850);
      configuration.checkValueNotSelected(RB_P, ATTR_CAM_BD, VAL_CAM_BD_EOS80D);

      configuration.selectAttribute(ATTR_CAM_BD, RB_P, VAL_CAM_BD_D850);
      configuration.checkValueSelected(RB_P, ATTR_CAM_BD, VAL_CAM_BD_D850);
      configuration.checkValueNotSelected(RB_P, ATTR_CAM_BD, VAL_CAM_BD_EOS80D);

      configuration.selectAttribute(ATTR_CAM_BD, RB_P, VAL_CAM_BD_EOS80D);
      configuration.checkValueNotSelected(RB_P, ATTR_CAM_BD, VAL_CAM_BD_D850);
      configuration.checkValueSelected(RB_P, ATTR_CAM_BD, VAL_CAM_BD_EOS80D);
    });

    it('should support single select (ddlb) bundle items', () => {
      configuration.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);
      configuration.clickOnGroup(2);
      configuration.checkCurrentGroupActive(GRP_CAM_IAW);

      configuration.checkAttributeDisplayed(ATTR_CAM_INS, DDLB_P);
      configuration.checkValueSelected(DDLB_P, ATTR_CAM_INS, VAL_NO_OPT_SEL);
      configuration.checkValueNotSelected(DDLB_P, ATTR_CAM_INS, VAL_CB_INS_Y2);

      configuration.selectAttribute(ATTR_CAM_INS, DDLB_P, VAL_CB_INS_Y2);
      configuration.checkValueNotSelected(DDLB_P, ATTR_CAM_INS, VAL_NO_OPT_SEL);
      configuration.checkValueSelected(DDLB_P, ATTR_CAM_INS, VAL_CB_INS_Y2);
    });

    it('should support multi select bundle items', () => {
      configuration.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);

      configuration.checkAttributeDisplayed(ATTR_CAM_MC, CBL_P);
      configuration.checkValueSelected(CBL_P, ATTR_CAM_MC, VAL_CAM_MC_128);
      configuration.checkValueNotSelected(CBL_P, ATTR_CAM_MC, VAL_CAM_MC_64);

      configuration.selectAttribute(ATTR_CAM_MC, CBL_P, VAL_CAM_MC_64);
      configuration.checkValueSelected(CBL_P, ATTR_CAM_MC, VAL_CAM_MC_128);
      configuration.checkValueSelected(CBL_P, ATTR_CAM_MC, VAL_CAM_MC_64);

      configuration.selectAttribute(ATTR_CAM_MC, CBL_P, VAL_CAM_MC_128);
      configuration.checkValueNotSelected(CBL_P, ATTR_CAM_MC, VAL_CAM_MC_128);
      configuration.checkValueSelected(CBL_P, ATTR_CAM_MC, VAL_CAM_MC_64);
    });
  });

  xdescribe('Group Handling', () => {
    it('should navigate with next and previous buttons', () => {
      configuration
        .goToConfigurationPage(POWERTOOLS, PROD_CODE_CAM, 'cpq')
        .then(() => {
          configuration.waitForProductCardsLoad(9);
          configuration.checkPreviousBtnDisabled();
          configuration.checkNextBtnEnabled();

          configuration.clickOnNextBtn(GRP_CAM_ACC);
          configuration.waitForProductCardsLoad(13);
          configuration.checkPreviousBtnEnabled();
          configuration.checkNextBtnEnabled();

          configuration.clickOnNextBtn(GRP_CAM_IAW);
          configuration.waitForProductCardsLoad(0);
          configuration.checkPreviousBtnEnabled();
          configuration.checkNextBtnDisabled();

          configuration.clickOnPreviousBtn(GRP_CAM_ACC);
          configuration.waitForProductCardsLoad(13);
        });
    });

    it('should navigate with sidebar menu', () => {
      configuration
        .goToConfigurationPage(POWERTOOLS, PROD_CODE_CAM, 'cpq')
        .then(() => {
          configuration.waitForProductCardsLoad(9);

          configuration.clickOnGroup(2);
          configuration.waitForProductCardsLoad(0);
          configuration.checkCurrentGroupActive(GRP_CAM_IAW);

          configuration.clickOnGroup(1);
          configuration.waitForProductCardsLoad(13);
          configuration.checkCurrentGroupActive(GRP_CAM_ACC);

          configuration.clickOnGroup(0);
          configuration.waitForProductCardsLoad(9);
          configuration.checkCurrentGroupActive(GRP_CAM_MAIN);
        });
    });

    it('should display correct attributes', () => {
      configuration
        .goToConfigurationPage(POWERTOOLS, PROD_CODE_CAM, 'cpq')
        .then(() => {
          configuration.waitForProductCardsLoad(9);

          configuration.checkAttributeHeaderDisplayed(ATTR_NAMES.GRP_CAM_MAIN);

          configuration.clickOnNextBtn(GRP_CAM_ACC);
          configuration.checkAttributeHeaderDisplayed(ATTR_NAMES.GRP_CAM_ACC);

          configuration.clickOnNextBtn(GRP_CAM_IAW);
          configuration.checkAttributeHeaderDisplayed(ATTR_NAMES.GRP_CAM_IAW);
        });
    });
  });
});
