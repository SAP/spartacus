/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickAllowAllFromBanner } from '../../../../helpers/anonymous-consents';
import * as cart from '../../../../helpers/cart';
import * as configuration from '../../../../helpers/product-configurator';
import * as configurationCart from '../../../../helpers/product-configurator-cart';
import * as configurationCartCpq from '../../../../helpers/product-configurator-cart-cpq';
import * as configurationCpq from '../../../../helpers/product-configurator-cpq';
import * as configurationCpqContainer from '../../../../helpers/product-configurator-container-cpq';
import * as configurationOverviewCpq from '../../../../helpers/product-configurator-overview-cpq';

const POWERTOOLS = 'powertools-spa';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const CPQ_USER = 'Gi Sun';

// UI types
const RADGRP = 'radioGroup';

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

/** Number of bundle line items of the train configured by this suite. */
const EXPECTED_BUNDLE_LINE_ITEMS = 2;

const CPQ_CONTAINER_DROP_DOWN_LIST_THRESHOLD = 2;

/**
 * `cartEntryBundleLineItemsThreshold` is the number of bundle line items up to
 * which a cart entry expands them inline. Above it, the 'show' link navigates
 * to the read-only configuration overview instead.
 */
const THRESHOLD_EXCEEDED = EXPECTED_BUNDLE_LINE_ITEMS - 1;

const testConfig = [
  {
    name: 'CPQ Configuration Cart Bundle Info',
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
      configurationCpqContainer.defineContainerAliases(config.backendURL);
      configurationCartCpq.registerCartRouteForBaseSite(POWERTOOLS);
      configurationCartCpq.registerRemoveCartEntryRouteForBaseSite(POWERTOOLS);
      cy.visit('/');
      clickAllowAllFromBanner();
      configurationCpq.login(EMAIL, PASSWORD, CPQ_USER);
      configurationCartCpq.clearCartIfNotEmpty(POWERTOOLS);
    });

    describe('Bundle line items of cart entry holding CPQ container configuration', () => {
      let cartEntryIndex: number;

      afterEach(() => {
        configurationCartCpq.goToCart(POWERTOOLS);
        cart.verifyCartNotEmpty();
        configurationCartCpq.checkCartPageReady();
        configurationCartCpq.removeCartEntryForProductCode(PROD_CODE_TRAIN);
        configurationCart.checkCartEmpty();
      });

      describe('when number of bundle line items exceeds configured threshold', () => {
        beforeEach(() => {
          cy.cxConfig({
            productConfigurator: {
              cpqContainerDropDownListThreshold:
                CPQ_CONTAINER_DROP_DOWN_LIST_THRESHOLD,
              cartEntryBundleLineItemsThreshold: THRESHOLD_EXCEEDED,
            },
          });
          prepareCartEntryWithConfiguredTrain();
        });

        it('should navigate to overview', () => {
          configurationCartCpq.checkBundleOverviewLink(
            cartEntryIndex,
            EXPECTED_BUNDLE_LINE_ITEMS
          );
          configurationCartCpq.clickOnBundleOverviewLink(cartEntryIndex);
          cy.wait('@readConfig');
          configurationOverviewCpq.checkDisplayOnlyOverviewFromCartDisplayed();

          configurationOverviewCpq.clickBackToCartBtnOnOP();
          configurationCartCpq.checkCartPageReady();
          configurationCartCpq.waitForCartEntryBundleInfo(PROD_CODE_TRAIN);
          configurationCartCpq.checkBundleOverviewLink(
            cartEntryIndex,
            EXPECTED_BUNDLE_LINE_ITEMS
          );
        });
      });

      /**
       * Sets up the cart entry a scenario runs against: configures the train,
       * adds it to the cart and remembers the index of the resulting cart entry.
       */
      function prepareCartEntryWithConfiguredTrain(): void {
        configureTrainWithLocomotiveAndWagon();
        configurationCartCpq.addConfigurableProductToCart(PROD_CODE_TRAIN);
        configurationCartCpq.withCartEntryIndexForProductCode(
          PROD_CODE_TRAIN,
          (index) => {
            cartEntryIndex = index;
          }
        );
      }
    });

    /**
     * Opens the configuration page of the train and adds a locomotive and a
     * wagon to its container attribute.
     */
    function configureTrainWithLocomotiveAndWagon(): void {
      configurationCpq.goToCPQConfigurationPage(POWERTOOLS, PROD_CODE_TRAIN);
      configurationCpqContainer.checkContainerAttributeDisplayed(ATTR_TR_COM);
      configurationCpq.checkAttributeHeaderDisplayed([ATTR_TR_COM_LABEL]);
      configurationCpqContainer.checkAvailableProducts(ATTR_TR_COM, {
        count: TRAIN_AVAILABLE_PRODUCTS.length,
        products: TRAIN_AVAILABLE_PRODUCTS,
        dropdown: true,
      });
      configurationCpq.selectAttributeAndCheck(
        ATTR_TR_TYPE,
        RADGRP,
        VAL_TR_Type_01
      );
      configurationCpqContainer.addProductAndReturnToParent(
        ATTR_TR_COM,
        VAL_TR_LOCOMOTIVE,
        GRP_TR_GENERAL
      );
      configurationCpqContainer.addProductAndReturnToParent(
        ATTR_TR_COM,
        VAL_TR_WAGON,
        GRP_TR_GENERAL
      );
      configurationCpqContainer.checkSelectedProducts(
        ATTR_TR_COM,
        EXPECTED_BUNDLE_LINE_ITEMS,
        [VAL_TR_LOCOMOTIVE, VAL_TR_WAGON]
      );
    }
  });
});
