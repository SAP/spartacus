import * as unitLevelOrderDetails from '../../../../helpers/b2b/b2b-order-details';


describe('B2B - Unit-Level Order Details Page', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Check unit level orders page sorting by buyer Ascendig ', () => {
    it('should display buyer and unit on order details page for unit-level-viewer user', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewerAdmin();
      unitLevelOrderDetails.getStubbedUnitLevelOrderHistory();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Buyer (Ascending)').click();

      cy.get('.cx-unit-level-order-history-buyer')
        .then(items => {
          const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
          const sortedItems = unsortedItems.slice().sort();
          expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
        });
      })

  });

  describe('Check unit level orders page sorting by Buyer (Descending)', () => {
    it('should display buyer and unit on order details page for unit-level-viewer user', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewerAdmin();
      unitLevelOrderDetails.getStubbedUnitLevelOrderHistory();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Buyer (Descending)').click();


      cy.get('.cx-unit-level-order-history-buyer')
        .then(items => {
          const unsortedItemsDescending = items.map((index, html) => Cypress.$(html).text()).get();
          const sortedItemsDesc = unsortedItemsDescending.slice().sort().reverse();
          expect(unsortedItemsDescending, 'Items are sorted').to.deep.equal(sortedItemsDesc);
        });
    })


  });

  describe('Check unit level orders page Order of sorting option ', () => {
    it('should display buyer and unit on order details page for unit-level-viewer user', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewerAdmin();
      unitLevelOrderDetails.getStubbedUnitLevelOrderHistory();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();

      cy.get('.ng-option')
        .then($items => {
          return $items.map((index, html) => Cypress.$(html).text()).get()
        })
        .should('deep.eq', ['Date', 'Order Number', 'Buyer (Ascending)', 'Buyer (Descending)', 'Unit (Ascending)', 'Unit (Descending)'])
        });
    })

  describe('Check unit level orders page sorting by Unit (Ascending)', () => {
    it('should display buyer and unit on order details page for unit-level-viewer user', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewerAdmin();
      unitLevelOrderDetails.getStubbedUnitLevelOrderHistory();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Unit (Ascending)').click();


      cy.get('.cx-unit-level-order-history-unit')
        .then(items => {
          const unsortedItemsAscending = items.map((index, html) => Cypress.$(html).text()).get();
          const sortedItemsAsc = unsortedItemsAscending.slice().sort();
          expect(unsortedItemsAscending, 'Items are sorted').to.deep.equal(sortedItemsAsc);
        });
    })


  });

  describe('Check unit level orders page sorting by Unit (Descending)', () => {
    it('should display buyer and unit on order details page for unit-level-viewer user', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewerAdmin();
      unitLevelOrderDetails.getStubbedUnitLevelOrderHistory();
      cy.visit(`/my-account/unitLevelOrders`);
      cy.get('.ng-input').click();
      cy.get('[class=ng-option-label]').contains('Unit (Descending)').click();


      cy.get('.cx-unit-level-order-history-unit')
        .then(items => {
          const unsortedItemsDescending1 = items.map((index, html) => Cypress.$(html).text()).get();
          const sortedItemsDsc1 = unsortedItemsDescending1.slice().sort().reverse();
          expect(unsortedItemsDescending1, 'Items are sorted').to.deep.equal(sortedItemsDsc1);
        });
    })


  });


});
