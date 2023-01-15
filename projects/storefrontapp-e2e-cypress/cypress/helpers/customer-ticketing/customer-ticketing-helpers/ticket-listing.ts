/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TestTicketDetails,
  TestStatus,
  TestSortingTypes,
  FIRST_ROW_TICKET_LIST,
  SUBJECT_COLUMN,
  CATEGORY_COLUMN,
  STATUS_COLUMN,
  ID_COLUMN,
  COLUMN_HEADER_TICKET_LIST,
  CREATED_ON_COLUMN,
  CHANGED_ON_COLUMN,
  MAX_TICKETS_PER_PAGE,
  ID_DELIMITER,
  STATUS_DELIMITER,
  SUBJECT_DELIMITER,
  TestCategory,
  FIFTH_ROW_TICKET_LIST,
  visitTicketDetailsForExistingTicket
} from './customer-ticketing-commons';
const MESSAGE_BOX = '.form-control';

export function clickTicketInRow(rowNumber = FIRST_ROW_TICKET_LIST) {
  cy.get('cx-customer-ticketing-list')
    .get('tbody')
    .get('tr')
    .eq(rowNumber)
    .click();
}

export function verifyCreatedTicketDetails(
  ticketDetails: TestTicketDetails,
  rowNumber = FIRST_ROW_TICKET_LIST
) {
  const row = cy
    .get('cx-customer-ticketing-list')
    .get('tbody')
    .get('tr')
    .eq(rowNumber);
  row.get('td').eq(SUBJECT_COLUMN).contains(ticketDetails.subject);
  row.get('td').eq(CATEGORY_COLUMN).contains(ticketDetails.category);
  row.get('td').eq(STATUS_COLUMN).contains('Open');

  row.click();
  cy.get('cx-messaging').contains(ticketDetails.message);
}

export function verifyTicketDoesNotExist(ticketDetails: TestTicketDetails) {
  cy.get('cx-customer-ticketing-list').then((ticketListingElement) => {
    if (ticketListingElement.find('tbody').length > 0) {
      cy.get('cx-customer-ticketing-list')
        .get('tbody')
        .get('tr')
        .eq(FIRST_ROW_TICKET_LIST)
        .get('td')
        .eq(SUBJECT_COLUMN)
        .should('not.contain', ticketDetails.subject);
    } else {
      cy.get('cx-customer-ticketing-list')
        .find('h3')
        .contains("You don't have any request");
    }
  });
}

export function verifyTicketListingTableContent() {
  cy.get('cx-customer-ticketing-list').then((ticketListingElement) => {
    if (ticketListingElement.find('tbody').length > 0) {
      const headerRow = cy
        .get('cx-customer-ticketing-list')
        .get('table')
        .get('tbody')
        .get('tr')
        .eq(COLUMN_HEADER_TICKET_LIST);
      headerRow.eq(ID_COLUMN).get('td').should('contain', ' Ticket ID ');
      headerRow.eq(SUBJECT_COLUMN).get('td').should('contain', ' Subject ');
      headerRow.eq(CATEGORY_COLUMN).get('td').should('contain', 'Category');
      headerRow.eq(CREATED_ON_COLUMN).get('td').should('contain', 'Created On');
      headerRow.eq(CHANGED_ON_COLUMN).get('td').should('contain', 'Changed On');
      headerRow.eq(STATUS_COLUMN).get('td').should('contain', 'Status');
    } else {
      cy.get('cx-customer-ticketing-list')
        .find('h3')
        .contains("You don't have any request");
    }
  });
}

export function getNumberOfTickets(): number {
  let numberOfTickets = 0;
  cy.get('cx-customer-ticketing-list').then((ticketListingElement) => {
    numberOfTickets = ticketListingElement.find('tbody').length;
  });
  return numberOfTickets;
}

export function shouldHaveNumberOfTicketsListed(
  expectedNumberOfTickets: number
) {
  cy.get('cx-customer-ticketing-list')
    .get('tbody')
    .should('have.length', expectedNumberOfTickets);
}

export function openTicketOnSepcifiedRowNumber(rowNumber: number) {
  const row = cy
    .get('cx-customer-ticketing-list')
    .get('tbody')
    .get('tr')
    .eq(rowNumber);
  row.click();
}

export function verifyStatusOfTicketInList(
  rowNumber = FIRST_ROW_TICKET_LIST,
  status = TestStatus.closed
) {
  const row = cy
    .get('cx-customer-ticketing-list')
    .get('tbody')
    .get('tr')
    .eq(rowNumber);
  row.get('td').eq(STATUS_COLUMN).contains(status);
}

export function verifyPaginationDoesNotExist() {
  cy.get('cx-pagination').should('not.exist');
}

export function verifyPaginationExist() {
  cy.get('cx-pagination').should('exist');
}

export function verifyPaginationExistBasedOnTheNumberOfTicketsCreated(
  numberOfTicketCreated: number
) {
  if (numberOfTicketCreated > MAX_TICKETS_PER_PAGE) {
    verifyPaginationExist();
  } else {
    verifyPaginationDoesNotExist();
  }
}

export function verifyNumberOfPagesBasedOnTotalNumberOfTickets(
  totalNumberOfTicketsCreated: number
) {
  const LEFT_RIGHT_ARROWS = 2;
  const FIRST_PAGE = 1;
  const expectedNumberOfPages =
    Math.floor(totalNumberOfTicketsCreated / MAX_TICKETS_PER_PAGE) +
    FIRST_PAGE +
    LEFT_RIGHT_ARROWS;
  verifyPaginationExistBasedOnTheNumberOfTicketsCreated(
    totalNumberOfTicketsCreated
  );
  cy.get('cx-pagination')
    .find('a')
    .should('have.length', expectedNumberOfPages);
}

export function selectSortBy(sort: TestSortingTypes) {
  cy.get('cx-sorting').click();
  cy.get('[aria-label="Sort orders"]')
    .get('.ng-value-label')
    .then((box) => {
      if (box.is(sort)) {
        cy.get('cx-sorting').click();
      } else {
        cy.get('cx-sorting')
          .get('ng-dropdown-panel')
          .get('span[ng-reflect-ng-item-label="' + sort + '"]')
          .click();
      }
    });
}

export function verifyCertainNumberOfTicketsSortedById(
  numberOfTicketsToVerify: number
) {
  for (let row = 1; row < numberOfTicketsToVerify; row++) {
    getIdInRow(row).then((id) => {
      const smallerId = parseInt(id.text(), 10);
      getIdInRow(row + 1)
        .invoke('text')
        .then(parseFloat)
        .should('be.lt', smallerId);
    });
  }
}

function getIdInRow(rowNumber: number) {
  return cy
    .get('cx-customer-ticketing-list')
    .get('tbody')
    .get('tr')
    .eq(rowNumber)
    .find('td')
    .eq(ID_COLUMN)
    .find('a');
}

export function extractTicketDetailsFromFirstRowInTicketListingPage(): TestTicketDetails {
  const testTicketDetails: TestTicketDetails = {
    subject: '',
    message: '',
    category: TestCategory.complaint,
  };

  cy.get('cx-customer-ticketing-list')
    .find('tbody')
    .get('tr')
    .eq(FIRST_ROW_TICKET_LIST)
    .within(() => {
      cy.get('td')
        .eq(ID_COLUMN)
        .invoke('text')
        .then((id) => {
          testTicketDetails.id = id.substring(ID_DELIMITER);
        });
      cy.get('td')
        .eq(SUBJECT_COLUMN)
        .invoke('text')
        .then((subject) => {
          testTicketDetails.subject = subject.substring(SUBJECT_DELIMITER);
        });
      cy.get('td')
        .eq(STATUS_COLUMN)
        .invoke('text')
        .then((status) => {
          testTicketDetails.status = status.substring(STATUS_DELIMITER);
        });
    });

  return testTicketDetails;
}

export function verifyMessageBoxIsDisabled() {
  cy.get(MESSAGE_BOX).should('not.exist');
}

export function verifyMessageBoxIsEnabled() {
  cy.get(MESSAGE_BOX).should('exist');
}

export function verifyTicketIdIsSmallerInNextPageComparedToPreviousPageByComparingIds() {
  const TOTAL_NUMBER_OF_PAGES_TO_VISIT = 2;
  for (let page = 1; page < TOTAL_NUMBER_OF_PAGES_TO_VISIT; page++) {
    getIdInRow(FIRST_ROW_TICKET_LIST).then((id) => {
      const smallerId = parseInt(id.text(), 10);
      var next_page = page + 1;
      cy.get(`[aria-label="page ${next_page}"]`).click();
      getIdInRow(FIRST_ROW_TICKET_LIST)
        .invoke('text')
        .then(parseInt)
        .should('be.lt', smallerId);
    });
  }
}

export function verifyTicketIdIsSmallerInLastPageComparedToFirstPageByComparingIds() {
  getIdInRow(FIRST_ROW_TICKET_LIST).then((id) => {
    const smallerId = parseInt(id.text(), 10);
    clickPageOnPagination('last');
    getIdInRow(FIRST_ROW_TICKET_LIST)
      .invoke('text')
      .then(parseInt)
      .should('be.lt', smallerId);
  });
}

export function clickPageOnPagination(pageLabel: string) {
  cy.get(`[aria-label="${pageLabel} page"]`).click();
}

export function verifyTicketIdIsHigherInFirstPageComparedToOtherPageByComparingIds() {
  getIdInRow(FIRST_ROW_TICKET_LIST).then((id) => {
    const biggerId = parseInt(id.text(), 10);
    clickPageOnPagination('first');
    getIdInRow(FIRST_ROW_TICKET_LIST)
      .invoke('text')
      .then(parseInt)
      .should('be.gt', biggerId);
  });
}

export function visitTicketDetailsOfFirstTicketByItsId(){
  cy.get('cx-customer-ticketing-list')
        .find('tbody')
        .get('tr')
        .eq(FIRST_ROW_TICKET_LIST)
        .within(() => {
          cy.get('td')
            .eq(ID_COLUMN)
            .invoke('text')
            .then((id) => {
              visitTicketDetailsForExistingTicket(
                id.substring(ID_DELIMITER).trim()
              );
            });
          });
}
