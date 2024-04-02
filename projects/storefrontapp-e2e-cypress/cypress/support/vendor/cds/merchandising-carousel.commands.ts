/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { carouselEventRequestAlias } from '../../../helpers/vendor/cds/merchandising-carousel';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for a carousel event to be sent to CDS. Returns the sent event
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.waitForCarouselEvent(eventSchema);
        ```
       */
      waitForCarouselEvent: (eventSchema: string) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('waitForCarouselEvent', (eventSchema: string) => {
  cy.wait(`@${carouselEventRequestAlias}-${eventSchema}`)
    .its('response.statusCode')
    .should('eq', 201);

  cy.get<Cypress.WaitXHR>(`@${carouselEventRequestAlias}-${eventSchema}`).then(
    ({ request }) => {
      return cy.wrap(request.body);
    }
  );
});
