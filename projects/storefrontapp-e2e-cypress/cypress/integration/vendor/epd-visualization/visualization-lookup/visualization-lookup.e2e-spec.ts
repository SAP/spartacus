describe('in Spare Parts Tab', () => {
  context('visualization lookup scenarios', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    beforeEach(() => {
      cy.intercept(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/cms/pages?pageType=ProductPage**`
      ).as('productPage');
    });

    context('no matching visualizations found', () => {
      it('viewport should be hidden', () => {
        cy.intercept('GET', '**/lookup/visualization**', {
          statusCode: 200,
          body: {
            visualizations: [],
          },
        }).as('lookupVisualization');

        cy.visit('/product/CX704/7%E2%80%9Dx12%E2%80%9D-mini-metal-lathe');
        cy.wait(`@productPage`);
        cy.get('cx-tab-paragraph-container > button')
          .contains('Spare Parts')
          .click();
        cy.wait(`@lookupVisualization`);
        cy.get(
          'cx-epd-visualization-visual-picking-tab .no-product-references'
        ).should('be.hidden');
        cy.get('cx-epd-visualization-product-list').should('be.visible');
        cy.get('cx-epd-visualization-product-filter').should('be.visible');
        cy.get('cx-epd-visualization-viewer', { timeout: 30000 }).should(
          'be.hidden'
        );
      });
    });

    context('multiple matching visualizations found', () => {
      it('viewport should be hidden', () => {
        cy.intercept('GET', '**/lookup/visualization**', {
          statusCode: 200,
          body: {
            visualizations: [{}, {}],
          },
        }).as('lookupVisualization');

        cy.visit('/product/CX704/7%E2%80%9Dx12%E2%80%9D-mini-metal-lathe');
        cy.wait(`@productPage`);
        cy.get('cx-tab-paragraph-container > button')
          .contains('Spare Parts')
          .click();
        cy.wait(`@lookupVisualization`);
        cy.get(
          'cx-epd-visualization-visual-picking-tab .no-product-references'
        ).should('be.hidden');
        cy.get('cx-epd-visualization-product-filter').should('be.visible');
        cy.get('cx-epd-visualization-viewer', { timeout: 30000 }).should(
          'be.hidden'
        );
      });
    });

    context('no spare parts found', () => {
      it('no spare parts indicator should be shown', () => {
        cy.intercept(
          'GET',
          '**/occ/v2/**/products/**/references**&referenceType=SPAREPART&**',
          {
            statusCode: 200,
            body: {
              references: [],
            },
          }
        ).as('getProductReferences');

        cy.visit('/product/CX704/7%E2%80%9Dx12%E2%80%9D-mini-metal-lathe');
        cy.wait(`@productPage`);
        cy.wait(`@getProductReferences`);
        cy.get('cx-tab-paragraph-container > button')
          .contains('Spare Parts')
          .click();
        cy.get(
          'cx-epd-visualization-visual-picking-tab .no-product-references'
        ).should('be.visible');
        cy.get('cx-epd-visualization-product-list').should('be.hidden');
        cy.get('cx-epd-visualization-product-filter').should('be.hidden');
        cy.get('cx-epd-visualization-viewer', { timeout: 30000 }).should(
          'be.hidden'
        );
      });
    });
  });
});
