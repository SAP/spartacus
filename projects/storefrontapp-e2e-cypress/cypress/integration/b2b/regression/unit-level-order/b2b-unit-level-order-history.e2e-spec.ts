import * as unitLevelOrderHistory from '../../../../helpers/b2b/b2b-order-history';
import * as sampleData from '../../../../sample-data/b2b-order-history';
import { doPlaceOrder } from '../../../../helpers/order-history';

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

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    unitLevelOrderHistory.loginB2bCommonUser();
    doPlaceOrder(sampleData.product1);
    doPlaceOrder(sampleData.product2);
    unitLevelOrderHistory.loginB2bUnitOrderViewer();
    doPlaceOrder(sampleData.product3);
    doPlaceOrder(sampleData.product4);
    unitLevelOrderHistory.loginB2bUnitOrderViewer2();
    doPlaceOrder(sampleData.product5);
    doPlaceOrder(sampleData.product6);
    unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
    cy.visit(`/my-account/unitLevelOrders`).wait(500);
  });

  describe('Check sorting of unit-level orders by buyer name', () => {
    it('should display unit-level orders sorted by Buyer (Ascending)', () => {
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Buyer (Ascending)').click();
      checkThatOrdersAreSorted(fieldBuyer);
    });

    it('should display unit-level orders sorted by Buyer (Descending)', () => {
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Buyer (Descending)').click();
      checkThatOrdersAreSorted(fieldBuyer, false);
    });
  });

  describe('Check sorting of unit-level orders by unit name', () => {
    it('should display unit-level orders sorted by Unit (Ascending)', () => {
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Unit (Ascending)').click();
      checkThatOrdersAreSorted(fieldUnit);
    });

    it('should display unit-level orders sorted by Unit (Descending)', () => {
      cy.get('.ng-input').first().click();
      cy.get('[class=ng-option-label]').contains('Unit (Descending)').click();
      checkThatOrdersAreSorted(fieldUnit, false);
    });
  });

  describe('Check unit-level orders history contains email', () => {
    it('email address should be displayed in buyer column under the name of the buyer ', () => {
      cy.get('.cx-unit-level-order-history-value').should(
        'contain',
        '@rustic-hw.com'
      );
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
      cleanFilter(filterUnit);
      setFilter(filterBuyer, buyerGiSun);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerGiSun);

      setFilter(filterBuyer, buyerMarkRivers);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerMarkRivers);

      setFilter(filterBuyer, buyerWilliamHunter);
      checkThatOrdersAreFilteredBy(fieldBuyer, buyerWilliamHunter);
    });

    it('should filter order history by unit name', () => {
      cleanFilter(filterBuyer);
      setFilter(filterUnit, unitCustomRetail);
      checkThatOrdersAreFilteredBy(fieldUnit, unitCustomRetail);

      setFilter(filterUnit, unitServicesWest);
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
    cy.get(dataCellSelector).then((items) => {
      const unsortedItems = items
        .map((_index, html) => Cypress.$(html).text())
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

  function setFilter(filterSelector: string, filterValue: string) {
    cy.get(filterSelector).type(`{selectAll}${filterValue}{enter}`).wait(1000);
  }

  function cleanFilter(filterSelector: string) {
    cy.get(filterSelector).type(`{selectAll}{backspace}`).wait(1000);
  }

  function resetFilter(filterSelector: string) {
    cy.get(filterSelector).next().click({ force: true });
  }

  function setMutuallyExclusiveFilterValues() {
    setFilter(filterBuyer, buyerMarkRivers);
    setFilter(filterUnit, unitServicesWest);
  }
});
