import * as storeFinder from '../../../helpers/store-finder';

context('Store finder', () => {
  before(() => {
    cy.visit('/store-finder');
  });

  it(
    ['store_finder'],
    'switch language should work and language should be persistent in url',
    () => {
      storeFinder.testAllowViewAllStores();
      storeFinder.testAllowViewStoreDetails();
    }
  );
});
