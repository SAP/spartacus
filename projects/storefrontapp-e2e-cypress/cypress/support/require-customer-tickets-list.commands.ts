/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestTicketDetails } from '../helpers/customer-ticketing/customer-ticketing-helpers/customer-ticketing-commons';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       *  Returns Customer Ticket Object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireCustomerTicketList(auth);
        ```
       */
      requireCustomerTicketList: (
        auth: {},
        ticketDetails: TestTicketDetails
      ) => Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add(
  'requireCustomerTicketList',
  (auth, { message, subject, ticketCategory }) => {
    function createCustomerTicket() {
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/tickets`,
        body: {
          message,
          subject,
          ticketCategory,
        },
        headers: {
          Authorization: `bearer ${auth.access_token}`,
        },
      });
    }

    createCustomerTicket().then((response) => {
      Cypress.log({
        name: 'requireCustomerTicketList',
        displayName: 'Create Customer Tickets (require)',
        message: [`🛒 Successfully created customer ticket`],
        consoleProps: () => {
          return {
            'Ticket ID': response.body.id,
            'Ticket Data': response.body,
          };
        },
      });
      cy.wrap(response.body);
    });
  }
);
