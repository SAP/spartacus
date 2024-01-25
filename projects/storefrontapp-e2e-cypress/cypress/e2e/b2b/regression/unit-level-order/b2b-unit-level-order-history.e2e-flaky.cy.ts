/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as unitLevelOrderHistory from '../../../../helpers/b2b/b2b-order-history';
import { doPlaceB2BOrder } from '../../../../helpers/b2b/b2b-order-history';
import * as sampleData from '../../../../sample-data/b2b-order-history';
import { interceptGet } from '../../../../support/utils/intercept';
import Chainable = Cypress.Chainable;

describe('B2B - Unit-Level Orders History', () => {
  const buyerGiSun = 'Gi Sun';
  const buyerMarkRivers = 'Mark Rivers';
  const buyerWilliamHunter = 'William Hunter';

  const unitCustomRetail = 'Custom Retail';
  const unitServicesWest = 'Services West';

  const fieldBuyer = '.cx-unit-level-order-history-buyer';
  const fieldUnit = '.cx-unit-level-order-history-unit';

  const filterBuyer = '[formcontrolname="buyerFilter"]';
  const filterUnit = '[formcontrolname="unitFilter"]';

  const orderHistoryPageUrl = '/orgUsers/current/orgUnits/orders?pageSize=*';

  let order0;
  let order1;
  let order2;
  before(() => {
    unitLevelOrderHistory.loginB2bCommonUser();
    doPlaceB2BOrder(sampleData.product1).then((resp) => (order0 = resp.body));
    unitLevelOrderHistory.loginB2bUnitOrderViewer();
    doPlaceB2BOrder(sampleData.product2).then((resp) => (order1 = resp.body));
    unitLevelOrderHistory.loginB2bUnitOrderViewer2();
    doPlaceB2BOrder(sampleData.product3).then((resp) => (order2 = resp.body));
  });

  describe('User without right', () => {
    it('is not allowed to access unit-level orders page', () => {
      unitLevelOrderHistory.loginB2bCommonUser();

      cy.visit('/my-account/unitLevelOrders');

      cy.location('pathname').should(
        'eq',
        `/${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/`
      );
      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'No sufficient permissions');
    });
  });

  describe('User with right', () => {
    let ordersToLoadAlias;

    beforeEach(() => {
      cy.wrap(order0).as('order0');
      cy.wrap(order1).as('order1');
      cy.wrap(order2).as('order2');
      ordersToLoadAlias = registerReloadOrdersAlias(orderHistoryPageUrl);
    });

    it('can see own placed orders', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewer();
      cy.visit('/my-account/unitLevelOrders');
      cy.wait(ordersToLoadAlias);

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
      cy.wait(ordersToLoadAlias);

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
      cy.wait(ordersToLoadAlias);

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

    it('can see email in buyer column under the name of the buyer', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit('/my-account/unitLevelOrders');
      cy.wait(ordersToLoadAlias);
      cy.get('.cx-unit-level-order-history-value').should(
        'contain',
        '@rustic-hw.com'
      );
    });

    it('can go to order details page', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();

      cy.visit('/my-account/unitLevelOrders');
      cy.wait(ordersToLoadAlias);
      assertClickOrderDetailsPage(order0);
    });
  });

  describe('User who wants to sort order history', () => {
    beforeEach(() => {
      const ordersToLoad = registerReloadOrdersAlias(orderHistoryPageUrl);
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit('/my-account/unitLevelOrders').wait(ordersToLoad);
    });

    it('can choose from six different sorting options', () => {
      cy.get('.ng-input').first().click();
      cy.get('.ng-option')
        .then(($items) => {
          return $items.map((_index, html) => Cypress.$(html).text()).get();
        })
        .should('have.all', [
          'Date',
          'Order Number',
          'Buyer (Ascending)',
          'Buyer (Descending)',
          'Unit (Ascending)',
          'Unit (Descending)',
        ]);
      cy.get('.ng-input').first().click();
    });

    it("can select 'Buyer (Ascending)' to see the list sorted ascending by buyer name", () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cy.get('.ng-input').first().click();
      cy.get('.ng-option-label').contains('Buyer (Ascending)').click();
      cy.wait(ordersToReload);
      checkThatOrdersAreSorted(fieldBuyer);
    });

    it("can select 'Unit (Descending)' to see the list sorted descending by unit name", () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cy.get('.ng-input').last().click();
      cy.get('.ng-option-label').contains('Unit (Descending)').click();
      cy.wait(ordersToReload);
      checkThatOrdersAreSorted(fieldUnit, false);
    });
  });

  describe('User who wants to filter order history', () => {
    beforeEach(() => {
      const ordersToLoad = registerReloadOrdersAlias(orderHistoryPageUrl);
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit('/my-account/unitLevelOrders').wait(ordersToLoad);
    });

    it('can use a Buyer filter that limits orders to a specific buyer', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cleanFilter(filterUnit).wait(ordersToReload);
      setFilter(filterBuyer, buyerGiSun).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerGiSun);
      setFilter(filterBuyer, buyerMarkRivers).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerMarkRivers);
      setFilter(filterBuyer, buyerWilliamHunter).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerWilliamHunter);
    });

    it('can use a Unit filter that limits orders to a specific unit', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cleanFilter(filterBuyer).wait(ordersToReload);
      setFilter(filterUnit, unitCustomRetail).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldUnit, unitCustomRetail);
      setFilter(filterUnit, unitServicesWest).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldUnit, unitServicesWest);
    });

    it('should see an empty list when setting mutually exclusive filter values', () => {
      setMutuallyExclusiveFilterValues();
      checkThatOrderListIsEmpty();
    });

    it('can reset the filter by pressing the reset icon', () => {
      resetFilter(filterBuyer);
      resetFilter(filterUnit);
      checkThatFilterIsCleaned(filterBuyer);
      checkThatFilterIsCleaned(filterUnit);
      checkThatOrdersListIsNotEmpty();
    });
  });

  function registerReloadOrdersAlias(urlToWaitFor: string) {
    return interceptGet('waitForOrderHistoryToReload', urlToWaitFor);
  }

  function checkThatOrderListIsEmpty() {
    cy.get('#order-history-table').should('not.exist');
  }

  function checkThatOrdersListIsNotEmpty() {
    cy.get('#order-history-table').should((tableData) => {
      expect(tableData).to.not.be.empty;
    });
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

  function checkThatOrdersAreSorted(
    dataCellSelector: string,
    ascending: boolean = true
  ) {
    cy.get(dataCellSelector).then((items) => {
      const unsortedItems = items
        .map((_index, html) => Cypress.$(html.lastChild.firstChild).text())
        .get();
      const sortedItems = ascending
        ? unsortedItems.slice().sort()
        : unsortedItems.slice().sort().reverse();
      expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
    });
  }

  function checkThatOrdersAreFilteredBy(
    dataCellSelector: string,
    expectedValue: string
  ) {
    cy.get(dataCellSelector)
      .should('have.length.at.least', 1)
      .and(($items) => {
        let items = $items.get();
        for (let item of items) {
          expect(item).to.contain(expectedValue);
        }
      });
  }

  function checkThatFilterIsCleaned(filterSelector: string) {
    cy.get(filterSelector).should('be.empty');
  }

  function setFilter(
    filterSelector: string,
    filterValue: string
  ): Chainable<any> {
    cy.get(filterSelector).type(`{selectAll}${filterValue}{enter}`);
    return cy.get('button.unit-level-order-history-search').click();
  }

  function cleanFilter(filterSelector: string): Chainable<any> {
    return cy.get(filterSelector).type(' {selectAll}{backspace}');
  }

  function resetFilter(filterSelector: string) {
    cy.get(filterSelector).next().click({ force: true });
  }

  function setMutuallyExclusiveFilterValues() {
    setFilter(filterBuyer, buyerMarkRivers);
    setFilter(filterUnit, unitServicesWest);
  }
});
