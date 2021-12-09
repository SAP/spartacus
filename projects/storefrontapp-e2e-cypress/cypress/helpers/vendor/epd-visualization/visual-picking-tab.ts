export function configureDefaultProduct() {
  cy.window().then((win) => win.sessionStorage.clear());

  // We need to ensure we use control the screen width, since the animation controls are removed at lower breakpoints.
  cy.viewport(1200, 800); // Bootstrap 4 XL breakpoint

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?pageType=ProductPage**`
  ).as('productPage');

  cy.visit('/product/CX704/7%E2%80%9Dx12%E2%80%9D-mini-metal-lathe');
  cy.wait(`@productPage`);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Lathes');
  cy.get('cx-breadcrumb').should('contain', 'Craftex');

  cy.get('cx-epd-visualization-visual-picking-tab');
}

export function verifyTabbingOrder() {
  // Ensure the spare parts tab is active
  cy.get('cx-tab-paragraph-container > button').contains('Spare Parts').click();

  cy.get('cx-epd-visualization-viewer', { timeout: 50000 }).should(
    'be.visible'
  );
  cy.get('cx-epd-visualization-viewer-toolbar-button', {
    timeout: 50000,
  }).should('be.visible');

  cy.get('cx-tab-paragraph-container > button').contains('Spare Parts').click();

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

  cy.get('cx-epd-visualization-product-list')
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

          if (
            $ii.find('.cx-add-to-cart cx-epd-visualization-compact-add-to-cart')
              .length > 0
          ) {
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
    .should('have.class', 'slide-indicator')
    .find('cx-icon')
    .should('have.class', 'cx-icon fas fa-circle');

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

  // should end up in the footer area
  cy.pressTab();
  cy.get('cx-footer-navigation:focus-within');
}
