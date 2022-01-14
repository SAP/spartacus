import * as configuration from '../../../helpers/product-configurator';

/**
 * This suite is marked as flaky because we cannot run it on the SPA pipeline as of now.
 * The underlying OCC API's are planned to be released only with commerce core 22.05
 */

const testProduct = '1934793';

context('Textfield Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Configuration process', () => {
    it('should support the textfield configuration aspect in product search, cart, checkout and order history', () => {
      configuration.completeOrderProcess(testProduct);
    });
  });
});
