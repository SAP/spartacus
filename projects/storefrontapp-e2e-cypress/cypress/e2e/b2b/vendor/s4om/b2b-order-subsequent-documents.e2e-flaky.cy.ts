/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../../sample-data/b2b-checkout';
import { isolateTestsBefore } from '../../../../support/utils/test-isolation';
import {
  clickOnFirstRowNavigation,
  loginB2bUser,
  navigateBack,
} from '../../../../helpers/b2b/b2b-subsequent-documents';
import * as sampleData from '../../../../sample-data/b2b-subsequent-documents';
import { openSubsequentDocumentList } from '../../../../helpers/b2b/b2b-subsequent-documents';
import {
  documentEntryListExpectedFirstRow,
  documentListExpectedFifthRow,
} from '../../../../sample-data/b2b-subsequent-documents';

describe('Order Subsequent Document', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
    Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
    Cypress.env('JDK_VERSION', 'JDK21');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept(
      'GET',
      `**/users/current/orders/*/subsequentDocuments?lang=en&curr=USD`
    ).as('getSubsequentDocuments');
    cy.intercept(
      'GET',
      `**/users/current/orders/*/subsequentDocuments/*/*/entries?lang=en&curr=USD`
    ).as('getSubsequentDocumentEntries');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should be able to login as a b2b user', () => {
    loginB2bUser();
  });

  it('should display empty document list message', () => {
    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_NO_DOCUMENTS);
    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('cx-message.cx-dialog-message.info-message').should('exist');
  });

  it('should display document list fetch error message', () => {
    cy.intercept(
      'GET',
      `**/users/current/orders/${sampleData.ORDER_CODE.WITH_DOCUMENTS}/subsequentDocuments?lang=en&curr=USD`,
      {
        statusCode: 500,
        body: {
          error: 'Internal Server Error',
        },
      }
    ).as('getSubsequentDocuments');

    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_DOCUMENTS);
    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 500);
    cy.get('cx-message.cx-dialog-message.error-message').should('exist');
  });

  it('should display document list tree', () => {
    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_DOCUMENTS);
    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('cx-order-subsequent-document-list').should('exist');
    cy.get('cx-order-subsequent-document-list table thead tr th').should(
      'have.length',
      5
    );

    cy.get('cx-order-subsequent-document-list table tbody tr')
      .should('have.length', 5)
      .eq(3)
      .find('td')
      .should('have.length', documentListExpectedFifthRow.length + 1) // extra column with button
      .then(($tds) => {
        // as screen gets smaller other columns merges into first column, so it have a different structure
        cy.wrap($tds[0])
          .find('div:not([class]) span')
          .invoke('text')
          .then((text) => {
            expect(text.trim()).to.eq(documentListExpectedFifthRow[0]);
          });
        $tds.slice(1, 4).each((index, $td) => {
          cy.wrap($td)
            .invoke('text')
            .then((text) => {
              expect(text.trim()).to.eq(
                documentListExpectedFifthRow[index + 1]
              );
            });
        });
        // fifth columns have button instead of a text
        cy.wrap($tds[4]).find('button').should('exist');
      });
  });

  it('should display document entry fetch error and remove it after navigating back', () => {
    cy.intercept(
      'GET',
      `**/users/current/orders/*/subsequentDocuments/*/*/entries?lang=en&curr=USD`,
      {
        statusCode: 500,
        body: {
          error: 'Internal Server Error',
        },
      }
    ).as('getSubsequentDocumentEntries');

    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_DOCUMENTS);

    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 200);

    clickOnFirstRowNavigation();

    cy.wait(`@getSubsequentDocumentEntries`)
      .its('response.statusCode')
      .should('eq', 500);
    cy.get('cx-message.cx-dialog-message.error-message').should('exist');

    cy.get('button.back').should('exist');
    navigateBack();

    cy.get('cx-order-subsequent-document-list').should('exist');
    cy.get('cx-message.cx-dialog-message.error-message').should('not.exist');
  });

  it('should display document entry list', () => {
    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_DOCUMENTS);
    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 200);

    clickOnFirstRowNavigation();

    cy.wait(`@getSubsequentDocumentEntries`)
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('cx-order-document-order-entry-list').should('exist');
    cy.get('cx-order-document-order-entry-list table thead tr th').should(
      'have.length',
      5
    );

    cy.get('cx-order-document-order-entry-list table tbody tr')
      .should('have.length', 1)
      .first()
      .find('td')
      .should('have.length', documentEntryListExpectedFirstRow.length)
      .then(($tds) => {
        // as screen gets smaller other columns merges into first column, so it have a different structure
        cy.wrap($tds[0])
          .find('div:not([class])')
          .invoke('text')
          .then((text) => {
            expect(text.trim()).to.eq(documentEntryListExpectedFirstRow[0]);
          });
        $tds.slice(1, 5).each((index, $td) => {
          cy.wrap($td)
            .invoke('text')
            .then((text) => {
              expect(text.trim()).to.eq(
                documentEntryListExpectedFirstRow[index + 1]
              );
            });
        });
      });
  });

  it('should cache fetch calls', () => {
    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_DOCUMENTS);

    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 200);

    clickOnFirstRowNavigation();

    cy.wait(`@getSubsequentDocumentEntries`)
      .its('response.statusCode')
      .should('eq', 200);

    navigateBack();

    cy.get('@getSubsequentDocuments.all').then((calls) => {
      expect(calls.length).to.eq(1);
    });

    clickOnFirstRowNavigation();

    cy.get('@getSubsequentDocumentEntries.all').then((calls) => {
      expect(calls.length).to.eq(1);
    });
  });

  it('should highlight correct row after navigating back', () => {
    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_DOCUMENTS);

    cy.wait(`@getSubsequentDocuments`)
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('cx-order-subsequent-document-list table tbody tr.selected').should(
      'not.exist'
    );

    clickOnFirstRowNavigation();

    cy.wait(`@getSubsequentDocumentEntries`)
      .its('response.statusCode')
      .should('eq', 200);

    navigateBack();

    cy.get('cx-order-subsequent-document-list table tbody tr.selected').should(
      'have.length',
      1
    );
    cy.get('cx-order-subsequent-document-list table tbody tr')
      .first()
      .should('have.class', 'selected');
  });

  it('should close modal both ways', () => {
    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_NO_DOCUMENTS);
    cy.get('cx-order-document-flow-dialog').should('exist');
    cy.get('div.cx-dialog-footer.modal-footer button').click();
    cy.get('cx-order-document-flow-dialog').should('not.exist');

    openSubsequentDocumentList(sampleData.ORDER_CODE.WITH_NO_DOCUMENTS);
    cy.get('cx-order-document-flow-dialog').should('exist');
    cy.get('div.cx-dialog-header.modal-header button.close').click();
    cy.get('cx-order-document-flow-dialog').should('not.exist');
  });
});
