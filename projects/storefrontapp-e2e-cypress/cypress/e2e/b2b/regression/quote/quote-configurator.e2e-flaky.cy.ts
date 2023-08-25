/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/quote';
import * as cart from '../../../../helpers/cart';

const POWERTOOLS = 'powertools-spa';
const testProductConfigurable = 'CONF_BANDSAW_ML';
const testProductConfigurableWithIssues = 'CONF_SCREWDRIVER_S';
const testProductConfigurableTextfield = '2116282';
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
        testProductConfigurableWithIssues,
        '1'
      );
      quote.clickOnRequestQuote();

      //we are still in cart, for now just check that
      //TODO check for messages once https://jira.tools.sap/browse/CXSPA-4079 is done
      cy.get('cx-cart-details').should('exist');

      //remove conflicting entry
      cart.removeCartItem({ name: testProductConfigurableWithIssues });
    });

    it('should support creation of a draft quote including VC configurable product', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurable, '1');

      //check: quote is in status draft
      quote.checkQuoteInDraftState(false, testProductConfigurable);

      //check: we can navigate to the VC overview page

      // TODO: edit configuration does not work for quote
      //configurationCart.clickOnEditConfigurationLink(0);
      //cy.get('cx-configurator-overview-sidebar').should('be.visible');
      //check: back navigation is possible
      //configuratorOverview.clickContinueToCartBtnOnOPAndExpectQuote();
    });
  });

  describe('Request quote process with textfield configurable product', () => {
    it('should support creation of a draft quote including textfield configurable product', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurableTextfield, '1');

      //check: quote is in status draft
      quote.checkQuoteInDraftState(false, testProductConfigurableTextfield);

      // TODO: edit configuration does not work for quote
      //check: we can navigate to the textfield configurator form
      //configurationCart.clickOnEditConfigurationLink(0);
      //cy.get('cx-configurator-textfield-form').should('be.visible');
    });
  });
});
