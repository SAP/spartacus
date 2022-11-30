import * as unitLevelOrderHistory from '../../../../helpers/b2b/b2b-order-history';

describe('B2B - Unit-Level Order Details Page', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());

    unitLevelOrderHistory.loginB2bCommonUser();
    unitLevelOrderHistory.addOrder();
    unitLevelOrderHistory.loginB2bUnitOrderViewer();
    unitLevelOrderHistory.addOrder();
    unitLevelOrderHistory.loginB2bUnitOrderViewer2();
    unitLevelOrderHistory.addOrder();
  });

  describe('Check unit level orders page sorting by Buyer', () => {
    it('should display nit level orders page sorted by Buyer (Ascending)', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Buyer (Ascending)').click();
      checkIfItemsAreSorted('.cx-unit-level-order-history-buyer');
    });

    it('should display nit level orders page sorted by Buyer  (Descending)', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Buyer (Descending)').click();
      checkIfItemsAreSorted('.cx-unit-level-order-history-buyer', false);
    });
  });

  describe('Check unit level orders page sorting by Unit', () => {
    it('Check unit level orders page sorting by Unit (Ascending)', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Unit (Ascending)').click();
      checkIfItemsAreSorted('.cx-unit-level-order-history-unit');
    });

    it('Check unit level orders page sorting by Unit (Descending)', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Unit (Descending)').click();
      checkIfItemsAreSorted('.cx-unit-level-order-history-unit', false);
    });
  });

  describe('Check unit level orders page contains email', () => {
    it('email address should be displayed in  buyer column under the name of the buyer ', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.cx-unit-level-order-history-value').contains(
        'mark.rivers@rustic-hw.com'
      );
    });
  });

  describe('Check unit level orders page Order of sorting option', () => {
    it('should display unit level orders page and drop down menu with sorting options', () => {
      unitLevelOrderHistory.loginB2bUnitOrderViewerManager();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
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

  function checkIfItemsAreSorted(elem: string, ascending: boolean = true) {
    cy.get(elem).then((items) => {
      const unsortedItems = items
        .map((_index, html) => Cypress.$(html).text())
        .get();
      const sortedItems = ascending
        ? unsortedItems.slice().sort()
        : unsortedItems.slice().sort().reverse();
      expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
    });
  }
});
