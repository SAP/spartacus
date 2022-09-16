import { loginB2bUser } from '../../../../helpers/b2b/b2b-checkout';
import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import {
  b2bAccountShipToUser,
  b2bProduct,
  cartWithB2bProductAndPremiumShipping,
  order_type,
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
  poNumber,
  costCenter,
} from '../../../../sample-data/b2b-checkout';
import {
  interceptOrdersEndpoint,
  waitForResponse,
} from '../../../../helpers/order-history';

describe('Order History with orders', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
    Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should be able to login as a b2b user', () => {
    loginB2bUser();
  });

  it('should add a product to cart', () => {
    b2bCheckout.addB2bProductToCartAndCheckout();
  });

  it('should select Account payment type', () => {
    b2bCheckout.enterPONumber();
    b2bCheckout.selectAccountPayment();
  });

  it('should enter shipping address', () => {
    b2bCheckout.selectAccountShippingAddress();
  });

  it('should select delivery mode', () => {
    b2bCheckout.selectAccountDeliveryMode();
  });

  it('should review and place order', () => {
    b2bCheckout.reviewB2bReviewOrderPage(
      b2bAccountShipToUser,
      cartWithB2bProductAndPremiumShipping,
      true,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
  });

  it('should display summary page', () => {
    b2bCheckout.reviewB2bOrderConfirmation(
      b2bAccountShipToUser,
      b2bProduct,
      cartWithB2bProductAndPremiumShipping
    );
  });

  it('should be able to view order in order history with PO# and Cost center', () => {
    cy.visit('/my-account/orders');
    const ordersAlias = interceptOrdersEndpoint();
    waitForResponse(ordersAlias);

    cy.get('cx-order-history h2').should('contain', 'Order history');
    cy.get('.cx-order-history-po a').should('contain', poNumber);
    cy.get('.cx-order-history-cost-center a').should('contain', costCenter);
  });
});
