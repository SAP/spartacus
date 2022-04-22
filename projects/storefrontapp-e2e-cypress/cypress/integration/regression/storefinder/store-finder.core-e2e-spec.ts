import * as storeFinder from '../../../helpers/store-finder';

context('Store finder', () => {
  before(() => {
    cy.visit('/store-finder');
  });

  storeFinder.testAllowViewAllStores();
  storeFinder.testAllowViewStoreDetails();
});
