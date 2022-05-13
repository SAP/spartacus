import * as productDetails from '../../../helpers/product-details';
import { formats } from '../../../sample-data/viewports';

context('Product details', () => {
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

    it(
      ['product_details', 'smoke_b2c'],
      'should validate product details functionality',
      () => {
        productDetails.productDetailsTest();
      }
    );
  });

  describe('Apparel', () => {
    before(productDetails.configureApparelProduct);

    it(
      ['product_details'],
      'should validate product details functionality',
      () => {
        productDetails.apparelProductDetailsTest();
      }
    );
  });
});
