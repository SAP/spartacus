export function configureDefaultProduct() {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['electronics-spa'],
      currency: ['USD'],
    },
  });

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?pageType=ProductPage**`
  ).as('productPage');

  cy.visit('/product/EVO-3-MIXER-DEMO/EvoMixer');
  cy.wait(`@productPage`);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Industrial Equipment');

  cy.get('cx-visual-picking-tab');
}

export function verifyTabbingOrder() {
  // Ensure the spare parts tab is active
  cy.get('cx-tab-paragraph-container > button').contains('Spare Parts').click();

  cy.get('cx-visual-viewer', { timeout: 30000 }).should('be.visible');
  cy.get('cx-visual-viewer-toolbar-button', { timeout: 30000 }).should(
    'be.visible'
  );

  cy.get('cx-icon.fa-home').parent().parent('button').focus();

  cy.pressTab(true);

  cy.focused().parent().get('cx-tab-paragraph-container').should('exist');

  cy.pressTab();
  cy.focused()
    .should('have.class', 'btn btn-link')
    .find('cx-icon')
    .should('have.class', 'fa-home');

  cy.pressTab();

  cy.focused()
    .should('have.class', 'btn btn-link checked')
    .find('cx-icon')
    .should('have.class', 'fa-sync-alt');

  cy.pressTab();

  cy.focused()
    .should('have.class', 'btn btn-link')
    .find('cx-icon')
    .should('have.class', 'fa-arrows-alt');

  cy.pressTab();

  cy.focused()
    .should('have.class', 'btn btn-link')
    .find('cx-icon')
    .should('have.class', 'fa-search');

  // Skipping isolate (fa-compress) - since it won't be enabled when nothing is selected
  cy.pressTab();

  cy.focused()
    .should('have.class', 'btn btn-link')
    .find('cx-icon')
    .should('have.class', 'fa-play');

  cy.pressTab();

  cy.focused().should('have.attr', 'cxvisualvieweranimationsliderhandle');

  cy.pressTab();
  cy.focused().should('have.class', 'sapVizKitViewport');

  cy.pressTab();
  cy.focused().should('have.attr', 'placeholder', 'Filter by name or id');

  cy.focused().type('v');

  cy.pressTab();
  cy.focused().should('have.class', 'cx-icon fas fa-times-circle');

  cy.get('cx-visual-picking-product-list')
    .find('.row.no-gutters.list-item')
    .should('have.length', 7)
    .each((_) => {
      cy.pressTab();
      cy.focused()
        .should('have.class', 'row no-gutters list-item')
        .within(($ii) => {
          cy.pressTab();
          cy.focused()
            .should('have.class', 'cx-link')
            .should('have.attr', 'href');

          if ($ii.find('.cx-add-to-cart cx-compact-add-to-cart').length > 0) {
            cy.pressTab();
            cy.focused().find('cx-icon').should('have.class', 'fa-cart-plus');
          }

          if ($ii.find('.cx-add-to-cart .cx-out-of-stock').length > 0) {
            cy.get('.cx-add-to-cart .cx-out-of-stock').should(
              'contain',
              'Out of stock'
            );
          }
        });
    });

  cy.pressTab();
  cy.focused()
    .should('have.class', 'slide-indicator')
    .find('cx-icon')
    .should('have.class', 'cx-icon fas fa-circle');

  cy.pressTab();
  cy.focused()
    .should('have.class', 'next')
    .find('cx-icon')
    .should('have.class', 'cx-icon fas fa-angle-right flip-at-rtl');

  // outside visual-picking
  cy.pressTab();
  cy.focused().should('contain', 'About SAP Commerce Cloud');
}
