import * as merchandisingCarousel from './merchandising-carousel';

export const cdsHelper = {
  setUpMocks() {
    cy.route(
      'GET',
      '/strategy/*/strategies/*/products**',
      merchandisingCarousel.STRATEGY_RESPONSE
    );
  },
};
