/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/quote';
import * as cart from '../../../../helpers/cart';

const POWERTOOLS = 'powertools-spa';
const TEST_PRODUCT_CONFIGURABLE = 'CONF_BANDSAW_ML';
const TEST_PRODUCT_CONFIGURABLE_WITH_ISSUES = 'CONF_SCREWDRIVER_S';
const TEST_PRODUCT_CONFIGURABLE_TEXTFIELD = '2116282';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const USER = 'Gi Sun';

context('Quote<->Configurator integration', () => {
  beforeEach(() => {
    cy.visit('/');
    quote.login(EMAIL, PASSWORD, USER);
  });

  describe('Request quote process with VC configurable product', () => {
    it('should not allow to request quote if the configuration has issues', () => {
      quote.addProductToCart(
        POWERTOOLS,
        TEST_PRODUCT_CONFIGURABLE_WITH_ISSUES,
        '1'
      );
      quote.clickOnRequestQuote();

      //we are still in cart, for now just check that
      //TODO check for messages once https://jira.tools.sap/browse/CXSPA-4079 is done
      cy.get('cx-cart-details').should('exist');

      //remove conflicting entry
      cart.removeCartItem({ name: TEST_PRODUCT_CONFIGURABLE_WITH_ISSUES });
    });

    it('should support creation of a draft quote including VC configurable product(CXSPA-4158)', () => {
      quote.prepareQuote(POWERTOOLS, TEST_PRODUCT_CONFIGURABLE, 1, false);
      quote.checkTotalEstimatedPrice('$270.00');
      quote.editVCConfigurableProduct(1);
      quote.checkQuoteInDraftState(false, TEST_PRODUCT_CONFIGURABLE);
      quote.gotToQuoteDetailsOverviewPage(); //remove when CXSPA-4840 is done
      quote.checkTotalEstimatedPrice('$300.00');
    });
  });

  describe('Request quote process with textfield configurable product', () => {
    it('should support creation of a draft quote including textfield configurable product', () => {
      quote.requestQuote(POWERTOOLS, TEST_PRODUCT_CONFIGURABLE_TEXTFIELD, '1');

      //check: quote is in status draft
      quote.checkQuoteInDraftState(false, TEST_PRODUCT_CONFIGURABLE_TEXTFIELD);

      // TODO: edit configuration does not work for quote
      //check: we can navigate to the textfield configurator form
      //configurationCart.clickOnEditConfigurationLink(0);
      //cy.get('cx-configurator-textfield-form').should('be.visible');
    });
  });
});
