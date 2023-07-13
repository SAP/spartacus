/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/quote';
import * as configurationCart from '../../../helpers/product-configurator-cart';

const POWERTOOLS = 'powertools-spa';
const testProductConfigurable = 'CONF_BANDSAW_ML';
const testProductConfigurableTextfield = '2116282';
const EMAIL = 'gi.sun@rustic-hw.com';
const PASSWORD = '12341234';
const USER = 'Gi Sun';

context('Quote<->Configurator integration', () => {
  beforeEach(() => {
    cy.visit('/');
    quote.login(EMAIL, PASSWORD, USER);
  });

  describe('Request quote process with VC configurable product', () => {
    it('should result in a quote in draft state', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurable, '1');
      quote.checkQuoteIsDraft();
    });

    it('should show navigation link to configurator on quote detailsand allow to navigate to OV page', () => {
      quote.requestQuote(POWERTOOLS, testProductConfigurable, '1');
      configurationCart.clickOnDisplayConfigurationLink(0);
      cy.get('cx-configurator-overview-sidebar').should('exist');
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
      cy.get('cx-configurator-textfield-form').should('exist');
    });
  });
});
