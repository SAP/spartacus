/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../../sample-data/b2b-checkout';
import { isolateTests } from '../../../../support/utils/test-isolation';
import {
  downloadAllAttachmentsTwice,
  loginB2bUser,
  openAttachmentList,
} from '../../../../helpers/b2b/b2b-order-attachments';
import * as sampleData from '../../../../sample-data/b2b-order-attachments';

describe('Order attachments', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
    Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept(
      'GET',
      `**/users/current/orders/*/attachments?lang=en&curr=USD`
    ).as('getOrderAttachments');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should be able to login as a b2b user', () => {
    loginB2bUser();
  });

  it('should display empty attachment list message', () => {
    openAttachmentList(sampleData.ORDER_CODE.NO_ATTACHMENTS);
    cy.wait(`@getOrderAttachments`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('cx-message.cx-dialog-message.info-message').should('exist');
  });

  it('should display attachment list fetch error message', () => {
    cy.intercept(
      'GET',
      `**/users/current/orders/${sampleData.ORDER_CODE.WITH_ATTACHMENTS}/attachments?lang=en&curr=USD`,
      {
        statusCode: 500,
        body: {
          error: 'Internal Server Error',
        },
      }
    ).as('getOrderAttachments');

    openAttachmentList(sampleData.ORDER_CODE.WITH_ATTACHMENTS);
    cy.wait(`@getOrderAttachments`)
      .its('response.statusCode')
      .should('eq', 500);
    cy.get('cx-message.cx-dialog-message.error-message').should('exist');
  });

  it('should display attachment list', () => {
    openAttachmentList(sampleData.ORDER_CODE.WITH_ATTACHMENTS);
    cy.wait(`@getOrderAttachments`)
      .its('response.statusCode')
      .should('eq', 200);
    // For proper testing list need to contain attachments that can and cannot be previewed
    cy.get('tr.order-attachment-row')
      .contains(sampleData.FILE_NAME.PREVIEWABLE)
      .should('exist');
    cy.get('tr.order-attachment-row')
      .contains(sampleData.FILE_NAME.NOT_PREVIEWABLE)
      .should('exist');
  });

  it('should download all attachments using both links and buttons', () => {
    downloadAllAttachmentsTwice();
  });

  it('should close modal both ways', () => {
    openAttachmentList(sampleData.ORDER_CODE.NO_ATTACHMENTS);
    cy.get('div.cx-dialog-footer.modal-footer button').click();
    cy.get('cx-order-attachments-dialog').should('not.exist');

    openAttachmentList(sampleData.ORDER_CODE.NO_ATTACHMENTS);
    cy.get('div.cx-dialog-header.modal-header button.close').click();
    cy.get('cx-order-attachments-dialog').should('not.exist');
  });
});
