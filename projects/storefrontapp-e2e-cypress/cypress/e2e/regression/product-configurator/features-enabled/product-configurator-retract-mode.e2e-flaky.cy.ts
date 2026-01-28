/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from '../../../../helpers/product-configurator';
import { clickAllowAllFromBanner } from '../../../../helpers/anonymous-consents';
import * as configurationOverviewVc from '../../../../helpers/product-configurator-overview-vc';
import * as configurationVc from '../../../../helpers/product-configurator-vc';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';

context('Product Configuration', () => {
  const commerceRelease: configurationVc.CommerceRelease = {};

  before(() => {
    configurationVc.checkCommerceRelease(
      electronicsShop,
      testProduct,
      commerceRelease
    );
  });

  beforeEach(() => {
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationOverviewVc.registerConfigurationOverviewRoute();
    cy.visit('/');
  });

  describe('Retract mode for product configuration', () => {
    let configUISettings: any;

    beforeEach(() => {
      configUISettings = {
        productConfigurator: {
          addRetractOption: true, // enable retract triggered
        },
      };
      cy.cxConfig(configUISettings);
      //Go to the configuration
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );
      clickAllowAllFromBanner();
      // Verify whether attribute is displayed
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
    });

    afterEach(() => {
      configUISettings.productConfigurator.addRetractOption = false; // disable retract triggered
    });

    it('should lead to additional retract value displayed when enabled', () => {
      // Verify whether all values are displayed including 'No option selected' / a retract value
      configuration.checkAttrValueDisplayed(
        CAMERA_MODE,
        radioGroup,
        '###RETRACT_VALUE_CODE###'
      );
      configuration.checkAttrValueDisplayed(CAMERA_MODE, radioGroup, 'P');
      configuration.checkAttrValueDisplayed(CAMERA_MODE, radioGroup, 'S');
      //Verify whether a retract value is selected as a default value
      configuration.checkValueSelected(
        radioGroup,
        CAMERA_MODE,
        '###RETRACT_VALUE_CODE###'
      );
    });

    it('should de-select the currently selected value when selecting the retract option', () => {
      //Select another value and verify whether a corresponding value is selected
      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        'S',
        commerceRelease.isPricingEnabled
      );
      configuration.checkValueSelected(radioGroup, CAMERA_MODE, 'S');

      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        'P',
        commerceRelease.isPricingEnabled
      );
      configuration.checkValueSelected(radioGroup, CAMERA_MODE, 'P');

      // Select a retract value and verify whether it is selected
      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        '###RETRACT_VALUE_CODE###',
        commerceRelease.isPricingEnabled
      );
      configuration.checkValueSelected(
        radioGroup,
        CAMERA_MODE,
        '###RETRACT_VALUE_CODE###'
      );
    });
  });
});
