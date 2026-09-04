/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from '../../../helpers/product-configurator';
import * as configurationCpq from '../../../helpers/product-configurator-cpq';
import * as configurationCpqContainer from '../../../helpers/product-configurator-cpq-container';
import * as configurationOverview from '../../../helpers/product-configurator-overview';
import * as configurationOverviewCpq from '../../../helpers/product-configurator-overview-cpq';
import * as configurationCart from '../../../helpers/product-configurator-cart';
import * as configurationCartCpq from '../../../helpers/product-configurator-cart-cpq';
import * as common from '../../../helpers/common';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

const POWERTOOLS = 'powertools-spa';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const CPQ_USER = 'Gi Sun';

// UI types
const RADGRP = 'radioGroup';
const CHKBOX = 'checkBoxList';
const DDLB = 'dropdown';
const RADGRP_PROD = 'radioGroupProduct';
const CHKBOX_PROD = 'checkBoxListProduct';
const DDLB_PROD = 'dropdownProduct';

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
const ATTR_CAM_BODY = '2893';
/** Nikon D850 */
const VAL_CAM_BODY_D850 = '8711';
/**  Canon EOS 80D */
const VAL_CAM_BODY_EOS80D = '8712';
/** Memory Card */
const ATTR_CAM_MC = '2894';
/** Sandisk Memory Card */
const VAL_CAM_MC_128 = '8714';
/**  SanDisk Ultra 64GB SDHC */
const VAL_CAM_MC_64 = '8715';
/** Lenses */
const ATTR_CAM_LEN = '2895';
/**  Sigma 85mm F1.4 DG HS*/
const VAL_CAM_LEN_SI = '8718';
/**  Nikon AF-P DX NIKKOR 70-300mm 1:4.5-6.3 G ED VR*/
const VAL_CAM_LEN_NI = '8721';
/** Bag */
const ATTR_CAM_BAG = '2897';
/** LowePro Streetline SL 140 */
const VAL_CAM_BAG_LP = '8726';
/** Are you a professional photographer? */
const ATTR_CAM_PROF = '2968';
/** YES */
const VAL_CAM_PROF_Y = '8953';
/** Insurance */
const ATTR_CAM_INS = '2899';
/** No Option Selected */
const VAL_NO_OPT_SEL = '###RETRACT_VALUE_CODE###';
/** Insurance Select 2 years */
const VAL_CB_INS_Y2 = '8735';
/** Insurance Pro 4 years */
const VAL_CB_INS_P4 = '8738';

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

/***************************** */
/** Configurable Train */
const PROD_CODE_TRAIN = 'CONF_TRAIN';
const GRP_TR_GENERAL = 'GENERAL';
/** Choose Train Type */
const ATTR_TR_TYPE = '3152';
/** Train Type 1 */
const VAL_TR_Type_01 = '9476';
/** Choose Configurable Train Components */
const ATTR_TR_COM = '3157';
const ATTR_TR_COM_LABEL = 'Choose Configurable Train Components';
/** Configurable Locomotive */
const VAL_TR_LOCOMOTIVE = 'Configurable Locomotive';
/** Configurable Wagon */
const VAL_TR_WAGON = 'Configurable Wagon';
/** Multiple-unit control */
const VAL_TR_MULTIPLE_UNIT = 'Multiple-unit control';
const TRAIN_AVAILABLE_PRODUCTS = [
  VAL_TR_LOCOMOTIVE,
  VAL_TR_WAGON,
  VAL_TR_MULTIPLE_UNIT,
];
/** Choose Wagon Type */
const ATTR_WAGON_TYPE = '3155';
/** Wagon Type 1 */
const VAL_WAGON_Type_01 = '9486';
/** Choose Wagon Color */
const ATTR_WAGON_COLOR = '3156';
/** Blue */
const VAL_WAGON_COLOR_BL = '9491';
/** Technical Settings */
const GRP_WAGON_TECH = 'Technical Settings';
/** Choose Wagon Components */
const ATTR_WAGON_COMPONENTS = '3159';
/** Configurable Wagon Cabin */
const VAL_WAGON_CABIN = 'Configurable Wagon Cabin';
/** Choose Cabin Type */
const ATTR_WAGON_CABIN_TYPE = '3158';
/** Cabin Type 1 */
const VAL_WAGON_CABIN_TYPE_1 = '9495';
/** Choose Seats */
const ATTR_WAGON_CABIN_SEATS = '3264';
/** Seats with Desks */
const VAL_WAGON_CABIN_SEATS_WITH_DESKS = '9803';
/** Select Number of Current Collectors */
const ATTR_NUM_OF_CURRENT_COLLECTORS = '3274';
const VAL_NUM_OF_CURRENT_COLLECTORS_1 = '9820';
const VAL_NUM_OF_CURRENT_COLLECTORS_4 = '9822';
const WARNING_LOCO_LOW_PERFORMANCE =
  'Low performance option not available, contact sales rep.';
const REQUIRED_MSG_SELECT_VALUE = 'Select a value';
const CONTAINER_REQUIRED_MSG = 'Add 5 more products';
const ERROR = 'ERROR';
const TRAIN_CONTAINER_PRODUCTS = [
  VAL_TR_LOCOMOTIVE,
  VAL_TR_LOCOMOTIVE,
  VAL_TR_WAGON,
  VAL_TR_WAGON,
  VAL_TR_WAGON,
];

const testConfig = [
  {
    name: 'CPQ Configuration',
    backendURL: `${Cypress.env('OCC_PREFIX')}/${POWERTOOLS}/cpqconfigurator/**`,
  },
];

testConfig.forEach((config) => {
  context(config.name, () => {
    const cpqSettings: any = {
      productConfigurator: {},
    };
    beforeEach(() => {
      cy.cxConfig(cpqSettings);
      cy.log('config.backendURL: ', config.backendURL);
      configuration.defineAliases(config.backendURL);
      cy.visit('/');
      clickAllowAllFromBanner();
      configurationCpq.login(EMAIL, PASSWORD, CPQ_USER);
    });

    describe('Navigate to Product Configuration Page', () => {
      it('should be able to navigate from the product search result', () => {
        configurationCpq.searchForProduct(PROD_CODE_CAM);
        configurationCpq.clickOnConfigureBtnInCatalog();
      });

      it('should be able to navigate from the product details page', () => {
        common.goToPDPage(POWERTOOLS, PROD_CODE_CAM);
        configurationCpq.clickOnConfigureBtnInCatalog();
      });
    });

    describe('Handling different UI type', () => {
      it('should support radio button attribute type', () => {
        common.goToPDPage(POWERTOOLS, PROD_CODE_COF);
        configurationCpq.clickOnConfigureBtnInCatalog();

        configuration.checkAttributeDisplayed(ATTR_COF_CUPS, RADGRP);

        configurationCpq.selectAttributeAndWait(
          ATTR_COF_CUPS,
          RADGRP,
          VAL_COF_CUPS_300
        );
        configuration.checkValueSelected(
          RADGRP,
          ATTR_COF_CUPS,
          VAL_COF_CUPS_300
        );

        configurationCpq.selectAttributeAndWait(
          ATTR_COF_CUPS,
          RADGRP,
          VAL_COF_CUPS_500
        );
        configuration.checkValueSelected(
          RADGRP,
          ATTR_COF_CUPS,
          VAL_COF_CUPS_500
        );
      });

      it('should support checkbox list attribute type', () => {
        common.goToPDPage(POWERTOOLS, PROD_CODE_COF);
        configurationCpq.clickOnConfigureBtnInCatalog();

        configuration.checkAttributeDisplayed(ATTR_COF_MODE, CHKBOX);
        configurationCpq.checkValueNotSelected(
          CHKBOX,
          ATTR_COF_MODE,
          VAL_COF_MODE
        );

        configurationCpq.selectAttributeAndWait(
          ATTR_COF_MODE,
          CHKBOX,
          VAL_COF_MODE
        );
        configuration.checkValueSelected(CHKBOX, ATTR_COF_MODE, VAL_COF_MODE);

        configurationCpq.selectAttributeAndWait(
          ATTR_COF_MODE,
          CHKBOX,
          VAL_COF_MODE
        );
        configurationCpq.checkValueNotSelected(
          CHKBOX,
          ATTR_COF_MODE,
          VAL_COF_MODE
        );
      });

      it('should support single select (radio) bundle items', () => {
        configurationCpq.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);
        configuration.checkCurrentGroupActive(GRP_CAM_MAIN);

        configuration.checkAttributeDisplayed(ATTR_CAM_BODY, RADGRP_PROD);
        configurationCpq.checkValueNotSelected(
          RADGRP_PROD,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_D850
        );
        configurationCpq.checkValueNotSelected(
          RADGRP_PROD,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_EOS80D
        );

        configuration.selectAttribute(
          ATTR_CAM_BODY,
          RADGRP_PROD,
          VAL_CAM_BODY_D850
        );
        configuration.checkValueSelected(
          RADGRP_PROD,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_D850
        );
        configurationCpq.checkValueNotSelected(
          RADGRP_PROD,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_EOS80D
        );

        configurationCpq.selectAttributeAndWait(
          ATTR_CAM_BODY,
          RADGRP_PROD,
          VAL_CAM_BODY_EOS80D
        );
        configurationCpq.checkValueNotSelected(
          RADGRP_PROD,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_D850
        );
        configuration.checkValueSelected(
          RADGRP_PROD,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_EOS80D
        );
      });

      it('should support single select (ddlb) bundle items', () => {
        configurationCpq.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);

        configurationCpq.clickOnGroup(2);
        configuration.checkCurrentGroupActive(GRP_CAM_IAW);

        configuration.checkAttributeDisplayed(ATTR_CAM_INS, DDLB_PROD);
        configuration.checkValueSelected(
          DDLB_PROD,
          ATTR_CAM_INS,
          VAL_NO_OPT_SEL
        );
        configurationCpq.checkValueNotSelected(
          DDLB_PROD,
          ATTR_CAM_INS,
          VAL_CB_INS_Y2
        );

        configurationCpq.selectAttributeAndWait(
          ATTR_CAM_INS,
          DDLB_PROD,
          VAL_CB_INS_Y2
        );
        configurationCpq.checkValueNotSelected(
          DDLB_PROD,
          ATTR_CAM_INS,
          VAL_NO_OPT_SEL
        );
        configuration.checkValueSelected(
          DDLB_PROD,
          ATTR_CAM_INS,
          VAL_CB_INS_Y2
        );
      });

      it('should support multi select bundle items', () => {
        configurationCpq.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);

        configuration.checkAttributeDisplayed(ATTR_CAM_MC, CHKBOX_PROD);
        configuration.checkValueSelected(
          CHKBOX_PROD,
          ATTR_CAM_MC,
          VAL_CAM_MC_128
        );
        configurationCpq.checkValueNotSelected(
          CHKBOX_PROD,
          ATTR_CAM_MC,
          VAL_CAM_MC_64
        );

        configurationCpq.selectAttributeAndWait(
          ATTR_CAM_MC,
          CHKBOX_PROD,
          VAL_CAM_MC_64
        );
        configuration.checkValueSelected(
          CHKBOX_PROD,
          ATTR_CAM_MC,
          VAL_CAM_MC_128
        );
        configuration.checkValueSelected(
          CHKBOX_PROD,
          ATTR_CAM_MC,
          VAL_CAM_MC_64
        );

        configurationCpq.selectAttributeAndWait(
          ATTR_CAM_MC,
          CHKBOX_PROD,
          VAL_CAM_MC_128
        );
        configurationCpq.checkValueNotSelected(
          CHKBOX_PROD,
          ATTR_CAM_MC,
          VAL_CAM_MC_128
        );
        configuration.checkValueSelected(
          CHKBOX_PROD,
          ATTR_CAM_MC,
          VAL_CAM_MC_64
        );
      });
    });

    describe('Group Handling', () => {
      it('should navigate with next and previous buttons', () => {
        configurationCpq
          .goToConfigurationPage(POWERTOOLS, PROD_CODE_CAM, 'cpq')
          .then(() => {
            configurationCpq.waitForProductCardsLoad(12);
            configuration.checkPreviousBtnDisabled();
            configuration.checkNextBtnEnabled();

            configuration.clickOnNextBtn(GRP_CAM_ACC);
            configurationCpq.waitForProductCardsLoad(14);
            configuration.checkPreviousBtnEnabled();
            configuration.checkNextBtnEnabled();

            configuration.clickOnNextBtn(GRP_CAM_IAW);
            configurationCpq.waitForProductCardsLoad(0);
            configuration.checkPreviousBtnEnabled();
            configuration.checkNextBtnDisabled();

            configuration.clickOnPreviousBtn(GRP_CAM_ACC);
            configurationCpq.waitForProductCardsLoad(14);
          });
      });

      it('should navigate via group menu', () => {
        configurationCpq
          .goToConfigurationPage(POWERTOOLS, PROD_CODE_CAM, 'cpq')
          .then(() => {
            configurationCpq.waitForProductCardsLoad(12);

            configurationCpq.clickOnGroup(2);
            configurationCpq.waitForProductCardsLoad(0);
            configuration.checkCurrentGroupActive(GRP_CAM_IAW);

            configurationCpq.clickOnGroup(1);
            configurationCpq.waitForProductCardsLoad(14);
            configuration.checkCurrentGroupActive(GRP_CAM_ACC);

            configurationCpq.clickOnGroup(0);
            configurationCpq.waitForProductCardsLoad(12);
            configuration.checkCurrentGroupActive(GRP_CAM_MAIN);
          });
      });

      it('should display correct attributes', () => {
        configurationCpq
          .goToConfigurationPage(POWERTOOLS, PROD_CODE_CAM, 'cpq')
          .then(() => {
            configurationCpq.waitForProductCardsLoad(12);

            configurationCpq.checkAttributeHeaderDisplayed(
              ATTR_NAMES.GRP_CAM_MAIN
            );

            configuration.clickOnNextBtn(GRP_CAM_ACC);
            configurationCpq.checkAttributeHeaderDisplayed(
              ATTR_NAMES.GRP_CAM_ACC
            );

            configuration.clickOnNextBtn(GRP_CAM_IAW);
            configurationCpq.checkAttributeHeaderDisplayed(
              ATTR_NAMES.GRP_CAM_IAW
            );
          });
      });
    });

    describe('Overview Page', () => {
      it('should display user selections and prices on overview page', () => {
        configurationCpq.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_CAM);
        configurationCpq.selectProductCard(
          RADGRP,
          ATTR_CAM_BODY,
          VAL_CAM_BODY_D850
        );
        configurationCpq.checkPrice(
          RADGRP_PROD,
          '$1,500.00',
          ATTR_CAM_BODY,
          VAL_CAM_BODY_D850
        );

        configurationCpq.checkPrice(
          CHKBOX_PROD,
          '1x($100.00) +$100.00',
          ATTR_CAM_MC,
          VAL_CAM_MC_128
        );
        configurationCpq.setQuantity(
          CHKBOX_PROD,
          2,
          ATTR_CAM_MC,
          VAL_CAM_MC_128
        );
        configurationCpq.checkPrice(
          CHKBOX_PROD,
          '2x($100.00) +$200.00',
          ATTR_CAM_MC,
          VAL_CAM_MC_128
        );

        configurationCpq.selectProductCard(
          CHKBOX,
          ATTR_CAM_LEN,
          VAL_CAM_LEN_SI
        );
        configurationCpq.selectProductCard(
          CHKBOX,
          ATTR_CAM_LEN,
          VAL_CAM_LEN_NI
        );
        configurationCpq.checkPrice(
          CHKBOX_PROD,
          '$800.00',
          ATTR_CAM_LEN,
          VAL_CAM_LEN_SI
        );
        configurationCpq.checkPrice(
          CHKBOX_PROD,
          '$700.00',
          ATTR_CAM_LEN,
          VAL_CAM_LEN_NI
        );

        configuration.clickOnNextBtn(GRP_CAM_ACC);
        configurationCpq.deSelectProductCard(
          RADGRP,
          ATTR_CAM_BAG,
          VAL_CAM_BAG_LP
        );

        configuration.clickOnNextBtn(GRP_CAM_IAW);
        configurationCpq.selectAttributeAndWait(
          ATTR_CAM_PROF,
          RADGRP,
          VAL_CAM_PROF_Y
        );
        //wait for this option to disappear
        configuration.checkAttrValueNotDisplayed(
          ATTR_CAM_INS,
          DDLB_PROD,
          VAL_CB_INS_Y2
        );

        configurationCpq.selectProductCard(DDLB, ATTR_CAM_INS, VAL_CB_INS_P4);
        configurationCpq.checkPrice(
          DDLB_PROD,
          '$600.00',
          ATTR_CAM_INS,
          VAL_CB_INS_P4
        );
        configuration.navigateToOverviewPage();

        configurationOverview.checkConfigOverviewPageDisplayed();
        configurationOverviewCpq.checkGroupHeaderDisplayed(GRP_CAM_MAIN, 0);
        configurationOverviewCpq.checkGroupHeaderNotDisplayed(GRP_CAM_ACC);
        configurationOverviewCpq.checkGroupHeaderDisplayed(GRP_CAM_IAW, 1);

        type ovContentType = {
          name?: string;
          value: string;
          type: 'product' | 'simple';
          price?: string;
        };
        const ovContent: ovContentType[] = [
          {
            name: 'Camera Body',
            value: 'Nikon D850',
            type: 'product',
            price: '+$1,500.00',
          },
          {
            name: 'Memory Card',
            value: 'SanDisk Extreme Pro',
            type: 'product',
            price: '2x($100.00) +$200.00',
          },
          {
            name: 'Lenses',
            value: 'Sigma 85mm F1.4 DG HS',
            type: 'product',
            price: '+$800.00',
          },
          { value: 'Nikon AF-P DX NIKKOR', type: 'product', price: '+$700.00' },
          {
            name: 'professional photographer?',
            value: 'yes',
            type: 'simple',
          },
          {
            name: 'Insurance',
            value: 'Pro 4 years',
            type: 'product',
            price: '+$600.00',
          },
        ];
        ovContent.forEach((line, idx) => {
          configurationOverviewCpq.checkAttrDisplayed(
            line.name,
            line.value,
            idx
          );
          configurationOverviewCpq.checkAttrPriceDisplayed(line.price, idx);
          configurationOverviewCpq.checkAttrType(line.type, idx);
        });
      });
    });

    describe('Configuration Process', () => {
      it('should support configuration aspect in product search, cart, checkout and order history', () => {
        common.goToPDPage(POWERTOOLS, PROD_CODE_CAM);
        common.clickOnAddToCartBtnOnPD();
        common.clickOnViewCartBtnOnPD();

        cy.get('cx-mini-cart .count').then((elem) => {
          const numberOfCartItems = Number(elem.text());
          cy.log('numberOfCartItems = ' + numberOfCartItems);
          editConfigurationFromCartEntry(numberOfCartItems);
          // Checkout
          configurationCartCpq.clickOnProceedToCheckoutBtnInCart();
          configurationCartCpq.checkoutB2B();
          configurationCartCpq.selectOrderByOrderNumberAlias(POWERTOOLS);
          configurationOverviewCpq.checkGroupHeaderDisplayed(GRP_CAM_MAIN, 0);
          configurationOverviewCpq.checkAttrDisplayed(
            'Camera Body',
            'Canon EOS 80D',
            0
          );
        });
      });
    });

    describe.only('Container Handling', () => {
      const containerLayouts = [
        {
          name: 'when available products are shown as cards',
          expectDropdown: false,
        },

        {
          name: 'when available products are shown as a searchable drop-down',
          dropDownThreshold: 2,
          expectDropdown: true,
        },
      ];

      containerLayouts.forEach(
        ({ name, dropDownThreshold, expectDropdown }) => {
          describe(name, () => {
            beforeEach(() => {
              configurationCpqContainer.defineContainerAliases(
                config.backendURL
              );
              cy.cxConfig({
                productConfigurator:
                  dropDownThreshold === undefined
                    ? {}
                    : {
                        cpqContainerDropDownListThreshold: dropDownThreshold,
                      },
              });
              configurationCpq.goToCPQConfigurationPage(
                POWERTOOLS,
                PROD_CODE_TRAIN
              );
              configurationCpqContainer.checkContainerAttributeDisplayed(
                ATTR_TR_COM
              );
              configurationCpq.checkAttributeHeaderDisplayed([
                ATTR_TR_COM_LABEL,
              ]);
            });

            it('should start with no selected products and three available products', () => {
              configurationCpqContainer.checkSelectedProducts(ATTR_TR_COM, 0);
              configurationCpqContainer.checkAvailableProducts(ATTR_TR_COM, {
                count: 3,
                products: TRAIN_AVAILABLE_PRODUCTS,
                dropdown: expectDropdown,
              });
            });

            it('should hide available products when the section is collapsed', () => {
              configurationCpqContainer.checkAvailableProducts(ATTR_TR_COM, {
                count: 3,
                products: TRAIN_AVAILABLE_PRODUCTS,
                dropdown: expectDropdown,
              });
              configurationCpqContainer.collapseContainerSection(
                configurationCpqContainer.AVAILABLE_PRODUCTS,
                ATTR_TR_COM
              );
              configurationCpqContainer.checkContainerSectionCardCount(
                configurationCpqContainer.AVAILABLE_PRODUCTS,
                ATTR_TR_COM,
                0
              );
              configurationCpqContainer.expandContainerSection(
                configurationCpqContainer.AVAILABLE_PRODUCTS,
                ATTR_TR_COM
              );
              configurationCpqContainer.checkAvailableProducts(ATTR_TR_COM, {
                count: 3,
                products: TRAIN_AVAILABLE_PRODUCTS,
                dropdown: expectDropdown,
              });
            });

            it('should add, edit, copy and remove selected products', () => {
              configurationCpqContainer.addProductAndReturnToParent(
                ATTR_TR_COM,
                VAL_TR_LOCOMOTIVE,
                GRP_TR_GENERAL
              );
              configurationCpqContainer.checkSelectedProducts(ATTR_TR_COM, 1, [
                VAL_TR_LOCOMOTIVE,
              ]);

              configurationCpqContainer.editSelectedProductAndReturnToParent(
                ATTR_TR_COM,
                VAL_TR_LOCOMOTIVE,
                0,
                GRP_TR_GENERAL
              );
              configurationCpqContainer.checkSelectedProducts(ATTR_TR_COM, 1, [
                VAL_TR_LOCOMOTIVE,
              ]);

              configurationCpqContainer.copySelectedProductAndReturnToParent(
                ATTR_TR_COM,
                VAL_TR_LOCOMOTIVE,
                0
              );
              configurationCpqContainer.checkSelectedProducts(ATTR_TR_COM, 2);

              configurationCpqContainer.addProductAndReturnToParent(
                ATTR_TR_COM,
                VAL_TR_WAGON,
                GRP_TR_GENERAL,
                4
              );
              configurationCpqContainer.checkSelectedProducts(ATTR_TR_COM, 6);

              configurationCpqContainer.removeSelectedProductAndWait(
                ATTR_TR_COM,
                VAL_TR_WAGON,
                0
              );
              configurationCpqContainer.checkSelectedProducts(ATTR_TR_COM, 5);
            });

            it('should update attributes of nested container products', () => {
              // Choose Train Type → Train Type 1
              configurationCpq.selectAttributeAndCheck(
                ATTR_TR_TYPE,
                RADGRP,
                VAL_TR_Type_01
              );
              // Choose Configurable Train Components → add Configurable Wagon
              configurationCpqContainer.addAvailableProductAndWait(
                ATTR_TR_COM,
                VAL_TR_WAGON
              );
              // Choose Wagon Type → Wagon Type 1
              configurationCpq.selectAttributeAndCheck(
                ATTR_WAGON_TYPE,
                RADGRP,
                VAL_WAGON_Type_01
              );
              // Choose Wagon Color → Blue
              configurationCpq.selectAttributeAndCheck(
                ATTR_WAGON_COLOR,
                RADGRP,
                VAL_WAGON_COLOR_BL
              );
              // Next group: Technical Settings
              configuration.clickOnNextBtn(GRP_WAGON_TECH);
              // Choose Wagon Components → add Configurable Wagon Cabin
              configurationCpqContainer.addAvailableProductAndWait(
                ATTR_WAGON_COMPONENTS,
                VAL_WAGON_CABIN
              );
              // Choose Cabin Type → Cabin Type 1
              configurationCpq.selectAttributeAndCheck(
                ATTR_WAGON_CABIN_TYPE,
                RADGRP,
                VAL_WAGON_CABIN_TYPE_1
              );
              // Choose Seats → Seats with Desks
              configurationCpq.selectAttributeAndCheck(
                ATTR_WAGON_CABIN_SEATS,
                CHKBOX,
                VAL_WAGON_CABIN_SEATS_WITH_DESKS
              );
            });

            it('should validation messages and resolve issues', () => {
              checkInitialConfigurationState();
              checkOverviewTwoIssues();
              checkRequiredMsgForTrainTypeAndContainer();
              checkErrorMsgForLocomotiveLowPerformance();
              checkResolveIssuesViaCollectors();
              checkResolveIssuesByAddingWagonCabins();
              checkAllIssuesResolved();
            });
          });
        }
      );
    });

    function goToOverviewWithIssues(issueCount: number): void {
      configuration.navigateToOverviewPage();
      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationOverviewCpq.verifyNotificationBannerOnOP(issueCount);
    }

    function resolveIssuesFromOverview(): void {
      configurationOverviewCpq.clickOnResolveIssuesLinkOnOP();
    }

    function checkContainerRemainingMessage(remaining: number): void {
      if (remaining > 1) {
        configurationCpq.checkContainerRequiredMessage(
          ATTR_TR_COM,
          `Add ${remaining} more products`
        );
      } else if (remaining === 1) {
        configurationCpq.checkContainerRequiredMessage(
          ATTR_TR_COM,
          `Add ${remaining} more product`
        );
      } else {
        configurationCpq.checkRequiredFieldMessageNotDisplayed(ATTR_TR_COM);
      }
    }

    // Section 1 — fresh configuration: no messages, no ERROR in group menu.
    function checkInitialConfigurationState(): void {
      configurationCpq.checkNoValidationMessagesDisplayed();
      configurationCpq.checkStatusIconNotDisplayed(GRP_TR_GENERAL);
    }

    // Section 2 — overview: 2 issues; resolve navigates to required attributes.
    function checkOverviewTwoIssues(): void {
      goToOverviewWithIssues(2);
      resolveIssuesFromOverview();
      configurationCpq.checkRequiredFieldMessageDisplayed(
        ATTR_TR_TYPE,
        REQUIRED_MSG_SELECT_VALUE
      );
      configurationCpq.checkRequiredFieldMessageDisplayed(
        ATTR_TR_COM,
        CONTAINER_REQUIRED_MSG
      );
      configurationCpq.checkStatusIconDisplayed(GRP_TR_GENERAL, ERROR);
    }

    // Section 3 — train type + container min rows (2 locomotives, 3 wagons).
    function checkRequiredMsgForTrainTypeAndContainer(): void {
      configurationCpq.selectAttributeAndCheck(
        ATTR_TR_TYPE,
        RADGRP,
        VAL_TR_Type_01
      );
      configurationCpq.checkRequiredFieldMessageNotDisplayed(ATTR_TR_TYPE);

      TRAIN_CONTAINER_PRODUCTS.forEach((product, index) => {
        configurationCpqContainer.addProductAndReturnToParent(
          ATTR_TR_COM,
          product,
          GRP_TR_GENERAL
        );
        checkContainerRemainingMessage(
          TRAIN_CONTAINER_PRODUCTS.length - index - 1
        );
      });
    }

    // Section 4 — locomotive collectors = 1: global + card warning.
    function checkErrorMsgForLocomotiveLowPerformance(): void {
      configurationCpqContainer.editSelectedProduct(
        ATTR_TR_COM,
        VAL_TR_LOCOMOTIVE,
        0
      );
      configurationCpq.selectAttributeAndCheck(
        ATTR_NUM_OF_CURRENT_COLLECTORS,
        DDLB,
        VAL_NUM_OF_CURRENT_COLLECTORS_1
      );
      configurationCpq.checkGlobalWarningMessageDisplayed(
        WARNING_LOCO_LOW_PERFORMANCE
      );
      configurationCpqContainer.navigateToParent(ATTR_TR_COM, GRP_TR_GENERAL);
      configurationCpqContainer.checkSelectedProductMessage(
        ATTR_TR_COM,
        VAL_TR_LOCOMOTIVE,
        0,
        WARNING_LOCO_LOW_PERFORMANCE
      );
    }

    // Section 5 — overview: 2 issues; set collectors to 4.
    function checkResolveIssuesViaCollectors(): void {
      goToOverviewWithIssues(4);
      resolveIssuesFromOverview();
      configurationCpq.checkGlobalWarningMessageDisplayed(
        WARNING_LOCO_LOW_PERFORMANCE
      );
      configurationCpq.selectAttributeAndCheck(
        ATTR_NUM_OF_CURRENT_COLLECTORS,
        DDLB,
        VAL_NUM_OF_CURRENT_COLLECTORS_4
      );
    }

    // Section 6 — overview: 3→0 issues; add wagon cabin per wagon.
    function checkResolveIssuesByAddingWagonCabins(): void {
      goToOverviewWithIssues(3);
      resolveIssuesFromOverview();
      for (let issuesLeft = 2; issuesLeft >= 0; issuesLeft--) {
        configurationCpqContainer.addAvailableProductAndWait(
          ATTR_WAGON_COMPONENTS,
          VAL_WAGON_CABIN
        );
        if (issuesLeft > 0) {
          goToOverviewWithIssues(issuesLeft);
          resolveIssuesFromOverview();
        }
      }
    }

    // Section 7 — overview: all issues cleared.
    function checkAllIssuesResolved(): void {
      configuration.navigateToOverviewPage();
      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationOverviewCpq.checkNoIssuesBannerOnOP();
    }

    function editConfigurationFromCartEntry(numberOfCartItems: number) {
      //We assume the last product in the cart is the one we added
      const cartEntryIndex: number = numberOfCartItems - 1;
      type ovBundleInfo = {
        name: string;
        price?: string;
        quantity?: string;
      };
      const ovBundleInfos: ovBundleInfo[] = [
        {
          name: 'SanDisk Extreme Pro 128GB SDXC',
          price: '$100.00',
          quantity: '1',
        },
        {
          name: 'Canon RF 24-105mm f4L IS USM',
          price: '$1,500.00',
        },
        {
          name: 'LowePro Streetline SL 140',
          price: '$110.00',
        },
      ];
      configurationCartCpq.checkAmountOfBundleItems(
        cartEntryIndex,
        ovBundleInfos.length
      );

      ovBundleInfos.forEach((line, bundleItemIndex) => {
        configurationCartCpq.checkBundleItemName(
          cartEntryIndex,
          bundleItemIndex,
          line.name
        );
        configurationCartCpq.checkBundleItemPrice(
          cartEntryIndex,
          bundleItemIndex,
          line.price
        );
        configurationCartCpq.checkBundleItemQuantity(
          cartEntryIndex,
          bundleItemIndex,
          line.quantity
        );
      });
      configurationCart.clickOnEditConfigurationLink(cartEntryIndex);

      configuration.checkAttributeDisplayed(ATTR_CAM_BODY, RADGRP_PROD);
      configurationCpq.selectAttributeAndWait(
        ATTR_CAM_BODY,
        RADGRP_PROD,
        VAL_CAM_BODY_D850
      );
      configuration.checkValueSelected(
        RADGRP_PROD,
        ATTR_CAM_BODY,
        VAL_CAM_BODY_D850
      );
      configurationCpq.selectAttributeAndWait(
        ATTR_CAM_BODY,
        RADGRP_PROD,
        VAL_CAM_BODY_EOS80D
      );
      configuration.checkValueSelected(
        RADGRP_PROD,
        ATTR_CAM_BODY,
        VAL_CAM_BODY_EOS80D
      );
      configurationCpq.selectAttributeAndWait(
        ATTR_CAM_LEN,
        CHKBOX_PROD,
        VAL_CAM_LEN_SI
      );
      configuration.checkValueSelected(
        CHKBOX_PROD,
        ATTR_CAM_LEN,
        VAL_CAM_LEN_SI
      );
      configurationCpq.clickAddToCartBtn();

      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationOverviewCpq.checkGroupHeaderDisplayed(GRP_CAM_MAIN, 0);
      configurationOverviewCpq.checkAttrDisplayed(
        'Camera Body',
        'Canon EOS 80D',
        0
      );

      configurationOverviewCpq.checkGroupHeaderDisplayed(GRP_CAM_ACC, 1);
      configurationOverview.clickContinueToCartBtnOnOP();

      configurationCartCpq.checkAmountOfBundleItems(cartEntryIndex, 4);
      configurationCartCpq.verifyCartCount(numberOfCartItems);
    }
  });
});
