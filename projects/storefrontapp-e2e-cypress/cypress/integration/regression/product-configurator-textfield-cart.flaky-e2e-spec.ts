import * as configuration from '../../helpers/product-configurator';

/**
 * This suite is marked as flaky due to performance (synchronization) issues on
 * https://spartacus-devci767.eastus.cloudapp.azure.com:9002 that we analyze in
 * https://cxjira.sap.com/browse/TIGER-7252
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
