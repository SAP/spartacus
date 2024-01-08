/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  interceptOrdersEndpoint,
  waitForResponse,
} from '../../../helpers/order-history';
import * as pdfInvoicesHelper from '../../../helpers/vendor/pdf-invoices/pdf-invoices';
import * as s4Helper from '../../../helpers/vendor/s4om/s4om';
import {
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../sample-data/b2b-checkout';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('PDF Invoices', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
    Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('PDF Invoices in Order History', () => {
    it('should be able to login as a b2b user (CXINT-1851)', () => {
      s4Helper.loginS4OMB2bUser();
    });

    it('should be able to view order in order history with PO# (CXINT-1851)', () => {
      cy.visit('/my-account/orders');
      const ordersAlias = interceptOrdersEndpoint();
      waitForResponse(ordersAlias);

      const pdfInvoicesOrderId = pdfInvoicesHelper.pdfInvoicesPastOrderId;
      cy.wrap(pdfInvoicesOrderId).should('not.be.null');
      s4Helper.findRowInOrderHistoryTable(
        ordersAlias,
        pdfInvoicesOrderId,
        pdfInvoicesHelper.poNumber
      );
    });

    it('should be able to view a past order detail in order detail page with requested delivery date information (CXINT-1851)', () => {
      cy.intercept({
        method: 'GET',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/orders/*`,
      }).as('getOrderDetail');

      cy.intercept({
        method: 'GET',
        path: `**/users/current/orders/**/invoices?**`,
      }).as('getInvoices');

      const pdfInvoicesOrderId = pdfInvoicesHelper.pdfInvoicesPastOrderId;
      cy.visit('/my-account/order/' + pdfInvoicesOrderId);
      cy.wait('@getOrderDetail');
      cy.wait('@getInvoices').its('response.statusCode').should('eq', 200);

      s4Helper.reviewB2bOrderDetail(
        pdfInvoicesHelper.pdfInvoicesB2bAccountShipToUser,
        pdfInvoicesHelper.pdfInvoicesProduct,
        pdfInvoicesHelper.cartWithB2bProductAndStandardShipping,
        true,
        null,
        pdfInvoicesHelper.poNumber,
        s4Helper.s4omCostCenter,
        s4Helper.s4omB2BUnit,
        false
      );

      pdfInvoicesHelper.verifyPDFInvoicesOrderDetailPage();
    });

    it('should be able to traverse pages (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTablePagination();
    });

    it('should be able to sort invoices by date ascending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByDateAscending();
    });

    it('should be able to sort invoices by date descending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByDateDescending();
    });

    it('should be able to sort invoices by net amount ascending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByNetAmountAscending();
    });

    it('should be able to sort invoices by net amount descending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByNetAmountDescending();
    });

    it('should be able to sort invoices by total amount ascending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByTotalAmountAscending();
    });

    it('should be able to sort invoices by total amount descending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByTotalAmountDescending();
    });

    it('should be able to sort invoices by Invoice Number ascending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByInvoiceNumAscending();
    });

    it('should be able to sort invoices by Invoice Number descending (CXINT-1851)', () => {
      pdfInvoicesHelper.verifyInvoicesTableSortByInvoiceNumDescending();
    });

    it('should be able to download first invoice (CXINT-1851)', () => {
      cy.intercept({
        method: 'GET',
        path: `**/users/current/orders/**/invoices?**`,
      }).as('getInvoices');

      const pdfInvoicesOrderId = pdfInvoicesHelper.pdfInvoicesPastOrderId;
      cy.visit('/my-account/order/' + pdfInvoicesOrderId);
      cy.wait('@getInvoices').its('response.statusCode').should('eq', 200);

      pdfInvoicesHelper.downloadFirstInvoice();
    });

    it('should be able to download first invoice (CXINT-1851)', () => {
      pdfInvoicesHelper.downloadLastInvoiceAcrossPages();
    });
  });
});
