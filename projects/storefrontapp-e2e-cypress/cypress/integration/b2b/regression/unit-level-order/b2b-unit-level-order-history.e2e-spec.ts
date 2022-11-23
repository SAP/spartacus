import * as unitLevelOrderHistory from '../../../../helpers/b2b/b2b-order-history';
import * as sampleData from '../../../../sample-data/b2b-order-history';
import { doPlaceB2BOrder } from '../../../../helpers/b2b/b2b-order-history';
import { interceptGet } from '../../../../support/utils/intercept';
import Chainable = Cypress.Chainable;

describe('B2B - Unit-Level Order History Filtering', () => {
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

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    const ordersToLoad = registerReloadOrdersAlias(orderHistoryPageUrl);
    unitLevelOrderHistory.loginB2bCommonUser();
    doPlaceB2BOrder(sampleData.product1);
    doPlaceB2BOrder(sampleData.product2);
    unitLevelOrderHistory.loginB2bUnitOrderViewer();
    doPlaceB2BOrder(sampleData.product3);
    doPlaceB2BOrder(sampleData.product4);
    unitLevelOrderHistory.loginB2bUnitOrderViewer2();
    doPlaceB2BOrder(sampleData.product5);
    doPlaceB2BOrder(sampleData.product6);
    unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
    cy.visit('/my-account/unitLevelOrders').wait(ordersToLoad);
  });

  describe('Check unit-level orders history contains email', () => {
    it('email address should be displayed in buyer column under the name of the buyer ', () => {
      cy.get('.cx-unit-level-order-history-value').should(
        'contain',
        '@rustic-hw.com'
      );
    });
  });

  describe('Check sorting of unit-level orders by buyer name', () => {
    it('should display unit-level orders sorted by Buyer (Ascending)', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Buyer (Ascending)').click();
      cy.wait(ordersToReload);
      checkThatOrdersAreSorted(fieldBuyer);
    });

    it('should display unit-level orders sorted by Buyer (Descending)', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Buyer (Descending)').click();
      cy.wait(ordersToReload);
      checkThatOrdersAreSorted(fieldBuyer, false);
    });
  });

  describe('Check sorting of unit-level orders by unit name', () => {
    it('should display unit-level orders sorted by Unit (Ascending)', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Unit (Ascending)').click();
      cy.wait(ordersToReload);
      checkThatOrdersAreSorted(fieldUnit);
    });

    it('should display unit-level orders sorted by Unit (Descending)', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Unit (Descending)').click();
      cy.wait(ordersToReload);
      checkThatOrdersAreSorted(fieldUnit, false);
    });
  });

  describe('Check presence and  order of sorting option', () => {
    it('should display unit level orders page and drop down menu with sorting options', () => {
      cy.get('.ng-input').first().click();
      cy.get('.ng-option')
        .then(($items) => {
          return $items.map((_index, html) => Cypress.$(html).text()).get();
        })
        .should('deep.eq', [
          'Date',
          'Order Number',
          'Buyer (Ascending)',
          'Buyer (Descending)',
          'Unit (Ascending)',
          'Unit (Descending)',
        ]);
    });
  });

  describe('Check unit-level orders filtering', () => {
    it('should filter order history by buyer name', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cleanFilter(filterUnit).wait(ordersToReload);
      setFilter(filterBuyer, buyerGiSun).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerGiSun);
      setFilter(filterBuyer, buyerMarkRivers).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerMarkRivers);
      setFilter(filterBuyer, buyerWilliamHunter).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerWilliamHunter);
    });

    it('should filter order history by unit name', () => {
      const ordersToReload = registerReloadOrdersAlias(orderHistoryPageUrl);
      cleanFilter(filterBuyer).wait(ordersToReload);
      setFilter(filterUnit, unitCustomRetail).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldUnit, unitCustomRetail);
      setFilter(filterUnit, unitServicesWest).wait(ordersToReload);
      checkThatOrdersAreFilteredBy(fieldUnit, unitServicesWest);
    });

    it('should not display orders history when mutually exclusive filers values are set', () => {
      setMutuallyExclusiveFilterValues();
      checkThatOrderListIsEmpty();
    });

    it('should clear the filter after the reset icon is clicked', () => {
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

  function checkThatOrdersAreSorted(
    dataCellSelector: string,
    ascending: boolean = true
  ) {
    cy.get(dataCellSelector, { timeout: 500 }).then((items) => {
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
      .each((element) => {
        expect(
          element.children('.cx-unit-level-order-history-value').text()
        ).to.contains(expectedValue);
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
