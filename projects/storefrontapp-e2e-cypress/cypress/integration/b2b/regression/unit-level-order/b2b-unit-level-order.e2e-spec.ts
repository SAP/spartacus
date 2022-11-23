import * as unitLevelOrderDetails from '../../../../helpers/b2b/b2b-order-details';
import * as sampleData from '../../../../sample-data/b2b-order-details';

describe('B2B - Unit-Level Order Details Page', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Check order details page', () => {
    it('should display buyer and unit on order details page for unit-level-viewer user', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewer();
      unitLevelOrderDetails.getStubbedUnitLevelOrderDetails();
      cy.visit(`/my-account/order/${sampleData.ORDER_CODE}`);
      assertUnitLevelOrderDetails(sampleData.unitLevelOrder);
    });

    it('should not display buyer and unit on order details page for ordinal user', () => {
      unitLevelOrderDetails.loginB2bCommonUser();
      unitLevelOrderDetails.getStubbedUnitLevelOrderDetails();
      cy.visit(`/my-account/order/${sampleData.ORDER_CODE}`);
      assertCommonUserOrderDetails(sampleData.unitLevelOrder);
    });
  });
});

function assertUnitLevelOrderDetails(order) {
  assertCommonFieldsOfOrderDetails(order);
  const buyerNameAndEmail = `${order.orgCustomer.name}  (${order.orgCustomer.uid})`;
  assertOrderDetailsCard(3, buyerNameAndEmail);
  assertOrderDetailsCard(4, order.orgUnit.name);
}

function assertCommonUserOrderDetails(order) {
  assertCommonFieldsOfOrderDetails(order);
  const buyerNameAndEmail = `${order.orgCustomer.name}  (${order.orgCustomer.uid})`;
  cy.get('cx-order-overview cx-card').should('not.contain', buyerNameAndEmail);
  cy.get('cx-order-overview cx-card').should('not.contain', order.orgUnit.name);
}

function assertCommonFieldsOfOrderDetails(order) {
  const entry = order.entries[0];
  // assert order status
  cy.get('cx-order-details-items .cx-list-status').should(
    'contain',
    sampleData.ORDER_STATUS
  );

  // assert products
  cy.get('.cx-item-list-row .cx-link').should('contain', entry.product.name);
  cy.get('.cx-item-list-row .cx-code').should('contain', entry.product.code);
  cy.get('.cx-item-list-row .cx-price').should(
    'contain',
    entry.basePrice.formattedValue
  );

  cy.get('.cx-item-list-row .cx-total').should(
    'contain',
    entry.totalPrice.formattedValue
  );

  // asserts order details
  assertOrderDetailsCard(0, order.code);
  assertOrderDetailsCard(1, sampleData.ORDER_DATE);
  assertOrderDetailsCard(2, sampleData.ORDER_STATUS);
}

function assertOrderDetailsCard(index: number, value: string) {
  cy.get('cx-order-overview cx-card').eq(index).should('contain', value);
}
