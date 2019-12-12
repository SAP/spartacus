import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';

describe('Merchandsing Carousel', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      '/strategy/*/strategies/*/products**',
      merchandisingCarousel.strategyResponse
    );
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should render with products and metadata', () => {
    merchandisingCarousel.checkMerchandisingCarouselRendersProducts();
  });
});
