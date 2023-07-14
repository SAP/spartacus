/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/quote';
import * as common from '../../../helpers/common';
import * as configurationCart from '../../../helpers/product-configurator-cart';
import * as configuratorOverview from '../../../helpers/product-configurator-overview';

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
    it('should result in a quote in draft state if default configuration has no issues', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurable, '1');
      quote.checkQuoteIsDraft();
    });

    it('should not allow to request quote if configuration has issues', () => {
      common.goToPDPage(POWERTOOLS, testProductConfigurableWithIssues);
      quote.setQtyOnPD('1');
      common.clickOnAddToCartBtnOnPD();
      common.clickOnViewCartBtnOnPD();
      quote.clickOnRequestQuoteInCart();

      //we are still in cart, for now just check that
      //TODO check for messages once https://jira.tools.sap/browse/CXSPA-4079 is done
      cy.get('cx-cart-details').should('exist');
      quote.clearCart();
    });

    it('should show navigation link to configurator on quote details page and allow to navigate to OV page', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurable, '1');
      configurationCart.clickOnDisplayConfigurationLink(0);
      cy.get('cx-configurator-overview-sidebar').should('be.visible');
      configuratorOverview.clickContinueToCartBtnOnOPAndExpectQuote();
    });
  });

  describe('Request quote process with textfield configurable product', () => {
    it('should result in a quote in draft state', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurableTextfield, '1');
      quote.checkQuoteIsDraft();
    });

    it('should show navigation link to configurator on quote details and allow to navigate to textfield form', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurableTextfield, '1');
      configurationCart.clickOnDisplayConfigurationLink(0);
      cy.get('cx-configurator-textfield-form').should('be.visible');
    });
  });
});
