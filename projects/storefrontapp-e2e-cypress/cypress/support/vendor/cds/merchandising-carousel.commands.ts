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
  cy.wait(`@${carouselEventRequestAlias}`)
    .its('response.statusCode')
    .should('eq', 201);

  cy.get<Cypress.WaitXHR>(`@${carouselEventRequestAlias}`).then(
    ({ request }) => {
      if (request.headers['hybris-schema'] !== eventSchema) {
        return cy.waitForCarouselEvent(eventSchema);
      }

      return cy.wrap(request.body);
    }
  );
});
