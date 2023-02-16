import { ELECTRONICS_CURRENCY } from './checkout-flow';

/**
 * Set specific baseSite configuration for test scenario.
 *
 * @param baseSite
 * @param currency
 */
export function setBaseSiteConfig(
  baseSite: string,
  currency: string = ELECTRONICS_CURRENCY
) {
  Cypress.env('BASE_SITE', baseSite);

  cy.cxConfig({
    context: {
      baseSite: [baseSite],
      currency: [currency],
    },
  });
}
