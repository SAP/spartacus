import * as configuration from '../../../helpers/product-configurator';

/**
 * Requires commerce core 22.05
 */
const testProduct = '1934793';

context('Textfield Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Configuration process', () => {
    it('should support configuration aspect in product search, cart, checkout and order history', () => {
      configuration.completeOrderProcess(testProduct);
    });
  });
});
