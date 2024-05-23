/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as configuration from '../../../../helpers/product-configurator';
import * as configurationVc from '../../../../helpers/product-configurator-vc';
import * as configurationOverview from '../../../../helpers/product-configurator-overview';

const TEST_PRODUCT_CONFIGURABLE = 'CONF_BANDSAW_ML';
const TEST_PRODUCT_CONFIGURABLE_WITH_ISSUES = 'CONF_SCREWDRIVER_S';
const TEST_PRODUCT_CONFIGURABLE_TEXTFIELD = '2116282';
const TEST_PRODUCT_NON_CONFIGURABLE = '3887130';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const USER = 'Gi Sun';

// List of attributes
const CONF_BS_THROATWIDTH = 'CONF_BS_THROATWIDTH';

// List of attribute values
const CONF_BS_LARGEWIDTH = 'CONF_BS_LARGEWIDTH';

// UI types
const radioGroup = 'radioGroup';

context('Quote<->Configurator integration', () => {
  // before all tests - ensure that cart is empty
  before(() => {
    cy.visit('/');
    quote.login(EMAIL, PASSWORD, USER);
    // add a product - so that it is guaranteed that clear cart link is available
    quote.addProductToCart(TEST_PRODUCT_NON_CONFIGURABLE, '1');
    quote.clearActiveCart();
    quote.logout();
  });

  beforeEach(() => {
    cy.visit('/');
    quote.login(EMAIL, PASSWORD, USER);
  });

  describe('Request quote process with VC configurable product', () => {
    it('should not allow to request quote if the configuration has issues', () => {
      quote.addProductToCart(TEST_PRODUCT_CONFIGURABLE_WITH_ISSUES, '1');
      quote.clickOnRequestQuote(true);
      quote.clearActiveCart();
    });

    it('should support creation of a draft quote including VC configurable product (CXSPA-4158)', () => {
      quote.prepareQuote(TEST_PRODUCT_CONFIGURABLE, 1, false);
      quote.checkTotalEstimatedPrice('$270.00');
      quote.clickOnEditConfigurationLink(1);
      configuration.selectAttribute(
        CONF_BS_THROATWIDTH,
        radioGroup,
        CONF_BS_LARGEWIDTH
      );
      configurationVc.clickAddToCartBtn();
      configurationOverview.clickContinueToCartBtnOnOPAndExpectQuote();
      quote.checkQuoteInDraftState(false, TEST_PRODUCT_CONFIGURABLE);
      quote.checkTotalEstimatedPrice('$300.00');
    });
  });

  describe('Request quote process with textfield configurable product', () => {
    it('should support creation of a draft quote including textfield configurable product', () => {
      quote.requestQuote(TEST_PRODUCT_CONFIGURABLE_TEXTFIELD, '1');

      //check: quote is in status draft
      quote.checkQuoteInDraftState(false, TEST_PRODUCT_CONFIGURABLE_TEXTFIELD);

      // TODO: edit configuration does not work for quote
      //check: we can navigate to the textfield configurator form
      //configurationCart.clickOnEditConfigurationLink(0);
      //cy.get('cx-configurator-textfield-form').should('be.visible');
    });
  });
});
