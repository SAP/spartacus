context('scroll Position Restoration', () => {
  const PRODUCT_NAME = 'DC Car Battery Adapter';
  const PRODUCT_LIST_URL = '/Brands/all/c/brands?currentPage=0';
  it('should restore scroll position', () => {
    let scrollPosY = 0;
    cy.intercept({
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/cms/components`,
    }).as('getComponents');

    cy.visit(PRODUCT_LIST_URL);
    cy.wait('@getComponents');
    cy.get('cx-product-list-item').should('exist');
    cy.get('cx-product-list-item').eq(3).scrollIntoView();
    cy.window().then(($window) => {
      scrollPosY = $window.scrollY;
    });
    cy.get('cx-product-list-item .cx-product-name').eq(3).click();
    cy.get('cx-breadcrumb h1').should('contain', PRODUCT_NAME);

    cy.go(-1);
    cy.window().then(($window) => {
      expect($window.scrollY).to.be.closeTo(scrollPosY, scrollPosY);
    });
    cy.get('cx-product-list-item h2').eq(3).should('contain', PRODUCT_NAME);

    cy.go(1);
    cy.get('cx-breadcrumb h1').should('contain', PRODUCT_NAME);
    cy.wait(500);
    cy.window().then(($window) => {
      expect($window.scrollY).to.be.closeTo(0, 0);
    });
  });
});
