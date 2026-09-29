/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as common from '../../../helpers/common';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationCartCpq from '../../../helpers/product-configurator-cart-cpq';
import * as configurationCpq from '../../../helpers/product-configurator-cpq';
import * as configurationCpqContainer from '../../../helpers/product-configurator-cpq-container';
import * as configurationOverview from '../../../helpers/product-configurator-overview';
import * as configurationOverviewCpq from '../../../helpers/product-configurator-overview-cpq';

const POWERTOOLS = 'powertools-spa';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const CPQ_USER = 'Gi Sun';

const RADGRP = 'radioGroup';

const PROD_CODE_TRAIN = 'CONF_TRAIN';
const PROD_NAME_TRAIN = 'Configurable Train';
const GRP_TR_GENERAL = 'GENERAL';
const ATTR_TR_TYPE = '3152';
const VAL_TR_Type_01 = '9476';
const ATTR_TR_COM = '3157';
const ATTR_TR_COM_LABEL = 'Choose Configurable Train Components';
const VAL_TR_LOCOMOTIVE = 'Configurable Locomotive';
const VAL_TR_WAGON = 'Configurable Wagon';

const EXPECTED_BUNDLE_LINE_ITEMS = 2;

const testConfig = [
  {
    name: 'CPQ Configuration Cart Bundle Info',
    backendURL: `${Cypress.env('OCC_PREFIX')}/${POWERTOOLS}/cpqconfigurator/**`,
  },
];

testConfig.forEach((config) => {
  context(config.name, () => {
    beforeEach(() => {
      cy.cxConfig({ productConfigurator: {} });
      configuration.defineAliases(config.backendURL);
      configurationCpqContainer.defineContainerAliases(config.backendURL);
      configurationCartCpq.registerCartRouteForBaseSite(POWERTOOLS);
      cy.visit('/');
      clickAllowAllFromBanner();
      configurationCpq.login(EMAIL, PASSWORD, CPQ_USER);
      configurationCartCpq.clearCartIfNotEmpty(POWERTOOLS);
    });

    describe('Cart entry bundle line items', () => {
      let cartEntryIndex: number;

      /**
       * Sets the bundle line-item threshold, adds the train to the cart,
       * configures it via the cart's edit link and remembers its cart entry index.
       * The threshold is the number of bundle line items up to which the cart
       * entry expands them inline; above it, the 'show' link navigates to the overview.
       *
       * @param {number} threshold - Value of `cartEntryBundleLineItemsThreshold`
       */
      function putConfiguredTrainInCart(threshold: number): void {
        cy.cxConfig({
          productConfigurator: {
            cartEntryBundleLineItemsThreshold: threshold,
          },
        });
        addConfTrainToCart();
        configurationCartCpq.withCartEntryIndexForProductCode(
          PROD_CODE_TRAIN,
          (index) => {
            cartEntryIndex = index;
            configurationCartCpq.clickOnEditBundleConfigurationLink(index);
          }
        );
        configureTrainWithLocomotiveAndWagon();
      }

      describe('when the line-item threshold is not exceeded', () => {
        beforeEach(() => {
          putConfiguredTrainInCart(EXPECTED_BUNDLE_LINE_ITEMS);
        });

        it('should expand bundle items inline', () => {
          configurationCartCpq.checkBundleInlineShowToggleDisplayed(
            cartEntryIndex
          );
          configurationCartCpq.checkAmountOfBundleItems(
            cartEntryIndex,
            EXPECTED_BUNDLE_LINE_ITEMS
          );

          configurationCartCpq.checkBundleLineItemProductLinkAndCode(
            cartEntryIndex,
            VAL_TR_LOCOMOTIVE
          );
          navigateToBundleLineItemPdpAndBackToCart(
            cartEntryIndex,
            VAL_TR_LOCOMOTIVE
          );

          configurationCartCpq.clickBundleInlineShowToggle(cartEntryIndex);
          configurationCartCpq.clickBundleLineItemEditProductConfiguration(
            cartEntryIndex,
            VAL_TR_LOCOMOTIVE
          );
          checkConfigPageDisplayedForBundleLineItem(VAL_TR_LOCOMOTIVE);
        });
      });

      describe('when the line-item threshold is exceeded', () => {
        beforeEach(() => {
          putConfiguredTrainInCart(EXPECTED_BUNDLE_LINE_ITEMS - 1);
        });

        it('should navigate to the read-only overview', () => {
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
    });

    function addConfTrainToCart(): void {
      common.goToPDPage(POWERTOOLS, PROD_CODE_TRAIN);
      common.clickOnAddToCartBtnOnPD();
      common.clickOnViewCartBtnOnPD();
      cy.wait('@getCart');
      configurationCartCpq.checkCartPageReady();
    }

    function configureTrainWithLocomotiveAndWagon(): void {
      configurationCpq.checkConfigPageDisplayed();
      configurationCpqContainer.checkContainerAttributeDisplayed(ATTR_TR_COM);
      configurationCpq.checkAttributeHeaderDisplayed([ATTR_TR_COM_LABEL]);
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
      configurationCpq.checkConfigPageDisplayed();
      configurationCpqContainer.checkSelectedProducts(
        ATTR_TR_COM,
        EXPECTED_BUNDLE_LINE_ITEMS
      );
      configurationCpq.clickAddToCartBtn();
      configurationOverviewCpq.checkOverviewPageReady();
      configurationOverview.clickContinueToCartBtnOnOP();
      cy.wait('@getCart');
      configurationCartCpq.checkCartPageReady();
      configurationCartCpq.waitForCartEntryBundleInfo(PROD_CODE_TRAIN);
    }

    /**
     * Opens the PDP of a bundle line item via its product link and returns to
     * the cart. Requires `checkBundleLineItemProductLinkAndCode` to have set
     * the `@bundleLineItemProductCode` alias.
     *
     * @param {number} cartEntryIndex - Index of the bundle cart entry
     * @param {string} productName - Name of the bundle line item
     */
    function navigateToBundleLineItemPdpAndBackToCart(
      cartEntryIndex: number,
      productName: string
    ): void {
      configurationCartCpq.clickBundleLineItemProductLink(
        cartEntryIndex,
        productName
      );
      const productNameSlug = productName.toLowerCase().replace(/\s+/g, '-');
      cy.get('@bundleLineItemProductCode').then((productCode) => {
        cy.location('pathname').should(
          'contain',
          `/product/${productCode}/${productNameSlug}`
        );
      });
      cy.get('.ProductDetailsPageTemplate').should('be.visible');

      cy.go('back');
      configurationCartCpq.checkCartPageReady();
      configurationCartCpq.waitForCartEntryBundleInfo(PROD_CODE_TRAIN);
    }

    function checkConfigPageDisplayedForBundleLineItem(
      productName: string
    ): void {
      configurationCpq.checkConfigPageDisplayed();
      cy.location('search').should('contain', 'rowId=');
      configuration.checkGroupTitle(GRP_TR_GENERAL);
      configuration.checkActiveGroupMenuItem(productName);
      configurationCpqContainer.checkProductTitleContains(
        `${PROD_NAME_TRAIN} / ${productName}`
      );
    }
  });
});
