import * as configuration from '../../helpers/product-configurator';

const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Configuration process', () => {
    it('should support the product configuration aspect in product search, cart, checkout and order history', () => {
      configuration.completeOrderProcess(testProductMultiLevel);
    });
  });
});
