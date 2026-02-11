/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  fillTicketDetails,
  TestCategory,
  TestTicketDetails,
} from '../../../helpers/customer-ticketing/customer-ticketing';

const testTicketDetails: TestTicketDetails = {
  subject: 'Automated a11y test',
  message: 'test message',
  ticketCategory: {
    id: TestCategory.complaint.toUpperCase(),
    name: TestCategory.complaint,
  },
};

describe('Customer Ticketing - Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('Empty requests page', () => {
    cy.visit('/my-account/support-tickets');
    cy.get('h3').contains("You don't have any request");
    cy.get('main').a11yRunContinuumTest();
  });

  it('Add new request - dialog', () => {
    cy.get('button').contains(' Add Request ').click();
    cy.get('button').contains(' Submit ').click();
    cy.get('cx-customer-ticketing-create-dialog').a11yRunContinuumTest();
  });

  it('Populated request page', () => {
    fillTicketDetails(testTicketDetails);
    cy.get('button').contains(' Submit ').click();
    cy.get('.cx-ticketing-list-data');
    cy.get('cx-customer-ticketing-list').a11yRunContinuumTest();
  });

  it('Ticket details', () => {
    cy.get('.cx-ticketing-list-value').first().click();
    cy.get('.cx-message-card');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Close request - dialog', () => {
    cy.get('button').contains(' Close Request ').click();
    cy.get('form textarea');
    cy.get('cx-customer-ticketing-close-dialog').a11yRunContinuumTest();
  });

  it('Reopen request - dialog', () => {
    cy.get('form textarea').type('close request');
    cy.get('button').contains(' Submit ').click();
    cy.get('.cx-ticketing-list-value').first().click();
    cy.get('button').contains(' Reopen Request ').click();
    cy.get('form textarea');
    cy.get('cx-customer-ticketing-reopen-dialog').a11yRunContinuumTest();
  });
});
