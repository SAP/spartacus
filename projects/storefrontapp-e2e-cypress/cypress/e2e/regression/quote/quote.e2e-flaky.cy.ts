/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/quote';

const testProduct = '3881034';
//const POWERTOOLS = 'powertools-spa';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const USER = 'Gi Sun';

context('Quote', () => {
  beforeEach(() => {
    cy.visit('/');
    quote.login(EMAIL, PASSWORD, USER);
  });

  describe('Request quote process', () => {
    it('should create a quote in status draft', () => {
      quote.requestQuote(testProduct);
    });
  });
});
