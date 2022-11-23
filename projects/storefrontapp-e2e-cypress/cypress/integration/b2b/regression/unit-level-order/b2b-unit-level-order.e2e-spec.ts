import * as unitLevelOrderDetails from '../../../../helpers/b2b/b2b-order-details';
import * as sampleData from '../../../../sample-data/b2b-order-details';
import * as unitLevelOrderHistory from '../../../../helpers/b2b/b2b-order-history';
import { doPlaceB2BOrder } from '../../../../helpers/b2b/b2b-order-history';
import { b2bProduct } from '../../../../sample-data/b2b-checkout';

describe('B2B - Unit-level order history page', () => {
  let order0;
  let order1;
  let order2;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    // William Hunter - Custom Retail
    unitLevelOrderHistory.loginB2bCommonUser();
    doPlaceB2BOrder(b2bProduct).then((resp) => (order0 = resp.body));

    // Gi Sun - Services West
    unitLevelOrderHistory.loginB2bUnitOrderViewer();
    doPlaceB2BOrder(b2bProduct).then((resp) => (order1 = resp.body));

    // Mark Rivers - Custom Retail
    unitLevelOrderHistory.loginB2bUnitOrderViewer2();
    doPlaceB2BOrder(b2bProduct).then((resp) => (order2 = resp.body));

    unitLevelOrderDetails.loginB2bUnitOrderViewer();
    cy.visit('/my-account/unitLevelOrders');
  });

  describe('Check unit-level orders display', () => {
    describe('User without right', () => {
      it('is not allowed to access unit-level orders page', () => {
        unitLevelOrderDetails.loginB2bCommonUser();

        cy.visit('/my-account/unitLevelOrders');

        cy.location('pathname').should(
          'eq',
          `/${Cypress.env('BASE_SITE')}/${Cypress.env(
            'BASE_LANG'
          )}/${Cypress.env('BASE_CURRENCY')}/`
        );
        cy.get('.alert')
          .should('be.visible')
          .and('contain.text', 'No sufficient permissions');
      });
    });

    describe('User with right', () => {
      beforeEach(() => {
        cy.wrap(order0).as('order0');
        cy.wrap(order1).as('order1');
        cy.wrap(order2).as('order2');
      });

      it('can see own placed orders', () => {
        unitLevelOrderHistory.loginB2bUnitOrderViewer();
        cy.visit('/my-account/unitLevelOrders');

        cy.get('@order0').then((order) => {
          assertNoUnitLevelOrderDisplayed(order);
        });
        cy.get('@order1').then((order) => {
          assertUnitLevelOrderDisplayed(order);
        });
        cy.get('@order2').then((order) => {
          assertNoUnitLevelOrderDisplayed(order);
        });
      });

      it('can see all placed orders from unit', () => {
        unitLevelOrderHistory.loginB2bUnitOrderViewer2();
        cy.visit('/my-account/unitLevelOrders');

        cy.get('@order0').then((order) => {
          assertUnitLevelOrderDisplayed(order);
        });
        cy.get('@order1').then((order) => {
          assertNoUnitLevelOrderDisplayed(order);
        });
        cy.get('@order2').then((order) => {
          assertUnitLevelOrderDisplayed(order);
        });
      });

      it('can see all placed orders from subunits', () => {
        unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
        cy.visit('/my-account/unitLevelOrders');

        cy.get('@order0').then((order) => {
          assertUnitLevelOrderDisplayed(order);
        });
        cy.get('@order1').then((order) => {
          assertUnitLevelOrderDisplayed(order);
        });
        cy.get('@order2').then((order) => {
          assertUnitLevelOrderDisplayed(order);
        });
      });

      it('can go to order details page', () => {
        unitLevelOrderHistory.loginB2bUnitOrderViewerManager();

        cy.visit('/my-account/unitLevelOrders');
        assertClickOrderDetailsPage(order0);
      });
    });
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

function assertUnitLevelOrderDisplayed(order) {
  cy.get('#order-history-table')
    .contains('tr', order.code)
    .should('contain.text', order.orgCustomer.email)
    .and('contain.text', order.orgUnit.name);
}

function assertNoUnitLevelOrderDisplayed(order) {
  cy.get('#order-history-table tr')
    .should('not.contain', order.code)
    .and('not.contain', order.orgCustomer.email)
    .and('not.contain', order.orgUnit.name);
}

function assertClickOrderDetailsPage(order) {
  cy.get('td a').contains(order.code).click();
  cy.get('cx-breadcrumb').should('contain.text', 'Unit-Level Order Details');
  cy.location('pathname').should(
    'contain',
    `unitLevelOrderDetails/${order.code}`
  );
  cy.contains('Order Number').parent().should('contain', order.code);
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
