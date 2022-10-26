import * as productDetails from '../../../helpers/product-details';
import { formats } from '../../../sample-data/viewports';

context('Product details', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });
  describe('Electronics', () => {
    before(productDetails.configureDefaultProduct);

    productDetails.productDetailsTest();
  });

  describe('Apparel', () => {
    before(productDetails.configureApparelProduct);

    productDetails.apparelProductDetailsTest();
  });
});

//TODO split this test in two files (one for mobile)
context(`${formats.mobile.width + 1}p resolution - Product details`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Electronics', () => {
    before(productDetails.configureDefaultProduct);

    productDetails.productDetailsTest();
  });

  describe('Apparel', () => {
    before(productDetails.configureApparelProduct);

    productDetails.apparelProductDetailsTest();
  });
});
