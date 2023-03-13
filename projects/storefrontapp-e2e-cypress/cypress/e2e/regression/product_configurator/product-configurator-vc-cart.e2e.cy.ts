/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as cart from '../../../helpers/cart';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationCart from '../../../helpers/product-configurator-cart';
import * as configurationCartVc from '../../../helpers/product-configurator-cart-vc';
import * as configurationOverview from '../../../helpers/product-configurator-overview';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';
import * as configurationVc from '../../../helpers/product-configurator-vc';

const electronicsShop = 'electronics-spa';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

// Group Status
const WARNING = 'WARNING';

// List of groups
const GENERAL = 'General';
const VIDEO_SYSTEM = 'Video System';
const SOURCE_COMPONENTS = 'Source Components';
const PROJECTOR = 'Projector';
const PROJECTOR_SCREEN = 'Projection Screen';
const FRONT_SPEAKERS = 'Front Speakers';
const CENTER_SPEAKER = 'Center Speaker';
const REAR_SPEAKER = 'Rear Speakers';
const SUBWOOFER = 'Subwoofer';

// List of attributes
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const GAMING_CONSOLE = 'GAMING_CONSOLE';
const CAMERA_DISPLAY = 'CAMERA_DISPLAY';
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_FORMAT_PICTURES = 'CAMERA_FORMAT_PICTURES';

// List of attribute values
const PROJECTOR_LCD = 'PROJECTOR_LCD';
const GAMING_CONSOLE_YES = 'GAMING_CONSOLE_YES';
const GAMING_CONSOLE_NO = 'GAMING_CONSOLE_NO';

// List of conflict groups
const CONFLICT_FOR_GAMING_CONSOLE = 'Conflict for Gaming Console';

// Conflict message
const Conflict_msg_gaming_console =
  'Gaming console cannot be selected with LCD projector';

context('Product Configuration', () => {
  let configUISettings: any;
  const commerceRelease: configurationVc.CommerceRelease = {};

  before(() => {
    configurationVc.checkCommerceRelease(
      electronicsShop,
      testProduct,
      commerceRelease
    );
  });

  beforeEach(() => {
    configUISettings = {
      productConfigurator: {
        enableNavigationToConflict: true,
      },
    };
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationOverviewVc.registerConfigurationOverviewRoute();
    cy.cxConfig(configUISettings);
    cy.visit('/');
  });

  afterEach(() => {
    configUISettings.productConfigurator.enableNavigationToConflict = false;
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the cart', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.clickAddToCartBtn();
      configurationVc.goToCart(electronicsShop);
      //We assume only one product is in the cart
      configurationCart.clickOnEditConfigurationLink(0);
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      clickAllowAllFromBanner();
      configuration.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configurationCart.clickOnEditConfigurationLink(0);
    });
  });

  describe('Conflict Solver', () => {
    it('should support the conflict solving process', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.clickOnNextBtnAndWait(PROJECTOR);
      configurationVc.selectAttributeAndWait(
        PROJECTOR_TYPE,
        radioGroup,
        PROJECTOR_LCD,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(GENERAL);
      configurationVc.clickOnGroupAndWait(3);

      configurationVc.selectConflictingValueAndWait(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1,
        commerceRelease.isPricingEnabled
      );

      cy.log('Conflict has been triggered');
      configurationVc.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
      configurationVc.deselectConflictingValueAndWait(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO,
        commerceRelease.isPricingEnabled
      );

      cy.log('Conflicting value has been de-selected');
      configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
      configurationVc.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
      configurationVc.selectConflictingValueAndWait(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1,
        commerceRelease.isPricingEnabled
      );

      cy.log('Conflicting value again has been selected');
      configurationVc.clickOnPreviousBtnAndWait(SUBWOOFER);
      configurationVc.clickOnPreviousBtnAndWait(REAR_SPEAKER);
      configurationVc.clickOnPreviousBtnAndWait(CENTER_SPEAKER);
      configurationVc.clickOnPreviousBtnAndWait(FRONT_SPEAKERS);
      configurationVc.clickOnPreviousBtnAndWait(PROJECTOR_SCREEN);
      configurationVc.clickOnPreviousBtnAndWait(PROJECTOR);
      configurationVc.checkConflictDetectedMsgDisplayed(PROJECTOR_TYPE);
      configurationVc.clickOnPreviousBtnAndWait(GENERAL);
      configurationVc.clickOnPreviousBtnAndWait(CONFLICT_FOR_GAMING_CONSOLE);
      configurationVc.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
      configurationVc.clickOnNextBtnAndWait(GENERAL);
      configurationVc.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
      configurationVc.clickAddToCartBtn();
      cy.log('Configuration has been added to the cart');
      // Navigate to Overview page and verify whether the resolve issues banner is displayed and how many issues are there
      if (commerceRelease.isAtLeast2205) {
        configurationOverviewVc.verifyNotificationBannerOnOP(0, 1);
      } else {
        configurationOverviewVc.verifyNotificationBannerOnOP(1);
      }
      // Navigate to cart and verify whether the  the resolve issues banner is displayed and how many issues are there
      configurationOverview.clickContinueToCartBtnOnOP();
      configurationCartVc.verifyNotificationBannerInCart(0, 1);
      // Navigate back to the configuration page
      configurationCart.clickOnEditConfigurationLink(0);
      cy.log('Cart configuration will be edited');
      // Navigate to Overview page and back to configuration via 'Resolve issues' link
      configurationVc.clickAddToCartBtn();
      cy.log('Continue to cart clicked');
      // Click 'Resolve issues' link in the banner and navigate back to the configuration
      if (commerceRelease.isAtLeast2205) {
        configurationOverviewVc.clickOnResolveConflictsLinkOnOP(); //post 2205
      } else {
        configurationOverviewVc.clickOnResolveIssuesLinkOnOP(); // pre 2205
      }
      configurationVc.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
      // Navigate back to the configuration page via clicking on 'View in Configuration' link and deselect conflicting value
      configurationVc.clickOnViewInConfigurationAndWait(GAMING_CONSOLE);
      configuration.checkAttributeDisplayed(GAMING_CONSOLE, radioGroup);
      configuration.checkCurrentGroupActive(SOURCE_COMPONENTS);
      configurationVc.deselectConflictingValueAndWait(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO,
        commerceRelease.isPricingEnabled
      );

      cy.log('Conflicting value again has been de-selected');
      //Click 'Add to cart' and verify whether the resolve issues banner is not displayed anymore
      configurationVc.clickAddToCartBtn();
      cy.log('Done button has been clicked');
      configurationOverviewVc.verifyNotificationBannerOnOP();
      // Click 'Continue to cart' and verify whether there is a resolve issues banner in the cart entry list
      configurationOverview.clickContinueToCartBtnOnOP();
      configurationCartVc.verifyNotificationBannerInCart(0);
    });

    it('should support the issue solving process', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        'S',
        commerceRelease.isPricingEnabled
      );

      configurationVc.navigateToOverviewPage();
      configurationOverviewVc.verifyNotificationBannerOnOP(2, 0);

      configurationOverviewVc.clickOnResolveIssuesLinkOnOPProductBound();
      configurationVc.selectAttributeAndWait(
        CAMERA_FORMAT_PICTURES,
        radioGroup,
        'JPEG',
        commerceRelease.isPricingEnabled
      );
      configurationVc.navigateToOverviewPage();
      configurationOverviewVc.verifyNotificationBannerOnOP(1, 0);

      configurationOverviewVc.clickOnResolveIssuesLinkOnOPProductBound();
      configurationVc.selectAttributeAndWait(
        CAMERA_DISPLAY,
        radioGroup,
        'P5',
        commerceRelease.isPricingEnabled
      );
      configurationVc.navigateToOverviewPage();
      configurationOverviewVc.verifyNotificationBannerOnOP(0, 0);
    });
  });

  describe('Configuration process', () => {
    it('should support configuration aspect in product search, cart, checkout and order history', () => {
      configuration.completeOrderProcess(testProductMultiLevel);
    });
  });
});
