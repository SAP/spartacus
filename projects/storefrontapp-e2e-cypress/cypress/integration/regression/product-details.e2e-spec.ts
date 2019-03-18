import * as productDetails from '../../helpers/product-details';
import { formats } from '../../sample-data/viewports';

context('Product details', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/product/266685');
  });

  productDetails.productDetailsTest();
});

context(`${formats.mobile.width + 1}p resolution - Product details`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/product/266685');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  productDetails.productDetailsTest();
});
