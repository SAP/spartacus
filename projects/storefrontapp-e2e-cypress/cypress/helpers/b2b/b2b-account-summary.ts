/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import { FULL_BASE_URL_EN_USD } from '../site-context-selector';
import { loginAsMyCompanyAdmin } from './my-company/my-company.utils';
import { standardUser } from '../../sample-data/shared-users';

export function loginAsAdmin() {
  loginAsMyCompanyAdmin();
}

export function loginAsNonAdmin() {
  const minWait = 750;
  const maxWait = 1500;
  cy.wait(Math.floor(Math.random() * (maxWait - minWait) + minWait));
  cy.requireLoggedIn(standardUser);
}

export function visitAccountSummaryDetailsPage(unitId: string) {
  // cy.intercept({
  //   method: 'GET',
  //   path: `**/users/current/orgUnits/**/accountSummary**`,
  // }).as('getSummary');
  // cy.intercept({
  //   method: 'GET',
  //   path: `**/users/current/orgUnits/**/orgDocuments**`,
  // }).as('getDocuments');
  // cy.intercept({
  //   method: 'GET',
  //   path: `**/users/current/orgUnits/**/attachments**`,
  // }).as('getAttachments');
  cy.visit(
    `${FULL_BASE_URL_EN_USD}/organization/account-summary/details/${unitId}`
  );
}

export function validateHeaderDetails(headerDetailTiles) {
  // There should be 7 cards
  cy.get('.cx-card').its('length').should('eq', headerDetailTiles.length);

  // Test each cards title and value
  headerDetailTiles.forEach((headerValues, index) => {
    cy.get('.cx-card')
      .eq(index)
      .find('.cx-card-title')
      .contains(headerValues.title);
    cy.get('.cx-card')
      .eq(index)
      .find('.cx-card-container')
      .contains(headerValues.value);
  });
}

export function sortDocuments(sortOrder: string) {
  cy.get('cx-sorting').click();
  cy.get('.ng-option').contains(sortOrder).click();
}

export function filterByDocumentNumberRange(start: string, end: string) {
  cy.get('[formcontrolname="filterBy"]').click();
  cy.get('.ng-option').contains('Document Number Range').click();
  cy.get('[formcontrolname="from"]').type(start);
  cy.get('[formcontrolname="to"]').type(end);

  pressSearch();
}

export function filterByStatus(status: string) {
  cy.get('[formcontrolname="status"]').click();
  cy.get('.ng-option').contains(status).click();

  pressSearch();
}

export function checkTableData(
  rows: Array<{
    documentNumber?: string;
    documentType?: string;
    createdOn?: string;
    dueOn?: string;
    originalAmount?: string;
    openAmount?: string;
    status?: string;
  }>
) {
  cy.get('.cx-account-summary-document-row')
    .its('length')
    .should('eq', rows.length);

  const columns: Array<{
    field: string;
    class: string;
    occurrence: number;
  }> = [
    { field: 'documentNumber', class: 'code', occurrence: 0 },
    { field: 'documentType', class: 'type', occurrence: 0 },
    { field: 'createdOn', class: 'date', occurrence: 0 },
    { field: 'dueOn', class: 'date', occurrence: 1 },
    { field: 'originalAmount', class: 'monetary', occurrence: 0 },
    { field: 'openAmount', class: 'monetary', occurrence: 1 },
    { field: 'status', class: 'status', occurrence: 0 },
  ];
  // For each row, check each column
  rows.forEach((row, rowNumber) => {
    columns.forEach((column) => {
      if (row[column.field]) {
        cy.get('.cx-account-summary-document-row')
          .eq(rowNumber)
          .find(`.cx-account-summary-document-${column.class}`)
          .eq(column.occurrence)
          .contains(row[column.field]);
      }
    });
  });
}

function pressSearch() {
  cy.get('button').contains('Search').click();
}
