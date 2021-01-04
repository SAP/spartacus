import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const powertoolsShop = 'powertools-spa';
const email = 'cpq03@sap.com';
const password = 'welcome';
const cpqUser = 'cpq03';
const testProduct = 'CONF_CAMERA_BUNDLE';
const testProductCoffeeMachine = 'CONF_COFFEEMACHINE_3000';

// UI types
const radioGroup = 'radioGroup';
const checkBoxList = 'checkBoxList';

// Attributes
const ATTR_COFFEE_MACHINE_CUPS_DAY = '2931'; // COFFEE_MACHINE_CUPS_DAY
const ATTR_COFFEE_MACHINE_STARB_MODE = '2933'; // COFFEE_MACHINE_STARB_MODE

// Attribute values
const COFFEE_MACHINE_CUPS_DAY_300_500 = '8841'; // 300-500 CUPS
const COFFEE_MACHINE_CUPS_DAY_500_1000 = '8842'; //  500-1000 CUPS

const STARB_MODE = '8845'; // STARB_MODE

// List of groups
const MAIN_COMPONENTS = 'Main Components';
const ACCESSORIES = 'Accessories';
const INSURANCE_AND_WARRANTY = 'Insurance and Warranty';

// List of attributes
const attributeHeaders = {
  mainComponents: ['Camera Body', 'Memory Card', 'Lenses'],
  accessories: ['Tripod', 'Bag', 'Special Accessories'],
  insuranceAndWarranty: [
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

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      cy.server();
      cy.route(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/suggestions?term=${testProduct}*`
      );
      productSearch.searchForProduct(testProduct);
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      configuration.goToPDPage(powertoolsShop, testProduct);
      configuration.clickOnConfigureBtnInCatalog();
    });
  });

  describe('Update attribute values', () => {
    it('should support update values for radio button attribute type', () => {
      configuration.goToPDPage(powertoolsShop, testProductCoffeeMachine);
      configuration.clickOnConfigureBtnInCatalog();
      configuration.checkAttributeDisplayed(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        radioGroup
      );
      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        radioGroup,
        COFFEE_MACHINE_CUPS_DAY_300_500
      );
      configuration.checkValueSelected(
        radioGroup,
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        COFFEE_MACHINE_CUPS_DAY_300_500
      );
      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        radioGroup,
        COFFEE_MACHINE_CUPS_DAY_500_1000
      );
      configuration.checkValueSelected(
        radioGroup,
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        COFFEE_MACHINE_CUPS_DAY_500_1000
      );
    });

    it('should support update values for checkbox list attribute type', () => {
      configuration.goToPDPage(powertoolsShop, testProductCoffeeMachine);
      configuration.clickOnConfigureBtnInCatalog();
      configuration.checkAttributeDisplayed(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        checkBoxList
      );

      configuration.checkValueNotSelected(
        checkBoxList,
        ATTR_COFFEE_MACHINE_STARB_MODE,
        STARB_MODE
      );

      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        checkBoxList,
        STARB_MODE
      );
      configuration.checkValueSelected(
        checkBoxList,
        ATTR_COFFEE_MACHINE_STARB_MODE,
        STARB_MODE
      );

      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        checkBoxList,
        STARB_MODE
      );
      configuration.checkValueNotSelected(
        checkBoxList,
        ATTR_COFFEE_MACHINE_STARB_MODE,
        STARB_MODE
      );
    });
  });

  const waitForConfiguratorLoad = () => {
    // Waiting for the configuration page to load correctly
    cy.get('.cx-product-card').should('have.length', 5);
    cy.get('.cx-product-card-action button:contains("Deselect")');
  };

  describe('Group Handling', () => {
    it('should navigate with next and previous buttons', () => {
      configuration
        .goToCPQConfigurationPage(powertoolsShop, testProduct)
        .then(() => {
          configuration.checkPreviousBtnDisabled();
          configuration.checkNextBtnEnabled();

          waitForConfiguratorLoad();

          configuration.clickOnNextBtn(ACCESSORIES);
          configuration.checkPreviousBtnEnabled();
          configuration.checkNextBtnEnabled();

          configuration.clickOnNextBtn(INSURANCE_AND_WARRANTY);
          configuration.checkPreviousBtnEnabled();
          configuration.checkNextBtnDisabled();

          configuration.clickOnPreviousBtn(ACCESSORIES);
        });
    });

    it('should navigate with sidebar menu', () => {
      configuration
        .goToCPQConfigurationPage(powertoolsShop, testProduct)
        .then(() => {
          waitForConfiguratorLoad();

          configuration.clickOnNthGroupMenu(1).then(() => {
            configuration.checkCurrentGroupActive(ACCESSORIES);
          });

          configuration.clickOnNthGroupMenu(2).then(() => {
            configuration.checkCurrentGroupActive(INSURANCE_AND_WARRANTY);
          });

          configuration.clickOnNthGroupMenu(0).then(() => {
            configuration.checkCurrentGroupActive(MAIN_COMPONENTS);
          });
        });
    });

    it('should display correct attributes', () => {
      configuration
        .goToCPQConfigurationPage(powertoolsShop, testProduct)
        .then(() => {
          waitForConfiguratorLoad();

          configuration.checkBundleAttributeDisplayed(
            attributeHeaders.mainComponents
          );

          configuration.clickOnNextBtn(ACCESSORIES);
          configuration.checkBundleAttributeDisplayed(
            attributeHeaders.accessories
          );

          configuration.clickOnNextBtn(INSURANCE_AND_WARRANTY);
          configuration.checkBundleAttributeDisplayed(
            attributeHeaders.insuranceAndWarranty
          );
        });
    });
  });
});
