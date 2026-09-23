/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationCpq from '../../../helpers/product-configurator-cpq';
import * as configurationCpqContainer from '../../../helpers/product-configurator-cpq-container';
import * as configurationOverview from '../../../helpers/product-configurator-overview';
import * as configurationOverviewCpq from '../../../helpers/product-configurator-overview-cpq';

const POWERTOOLS = 'powertools-spa';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const CPQ_USER = 'Gi Sun';

// UI types
const RADGRP = 'radioGroup';
const CHKBOX = 'checkBoxList';
const DDLB = 'dropdown';

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
    name: 'CPQ Configuration Container',
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

    describe('Container Handling', () => {
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

    // Section 3 — train type + container min rows (2 locomotives, 3 wagons and multiple-unit control).
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

      // Choose Configurable Train Components → add Multiple-unit control
      configurationCpqContainer.addAvailableProductAndWait(
        ATTR_TR_COM,
        VAL_TR_MULTIPLE_UNIT
      );
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
  });
});
