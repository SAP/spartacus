import * as merchandisingCarousel from './merchandising-carousel';

export const strategyRequestAlias = 'strategyProductsApiRequest';

export const cdsHelper = {
  setUpMocks(alias: string): void {
    cy.intercept(
      {
        method: 'GET',
        path: '/strategy/*/strategies/*/products**',
      },
      { body: merchandisingCarousel.STRATEGY_RESPONSE }
    ).as(alias);
  },
  allowInsecureCookies(): void {
    cy.cxConfig({
      cds: {
        profileTag: {
          allowInsecureCookies: true,
        },
      },
    });
  },
};
