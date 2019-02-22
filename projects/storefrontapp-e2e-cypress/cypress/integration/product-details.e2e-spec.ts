context('Product details', () => {
  const PRODUCT_NAME = 'Battery Video Light';

  before(() => {
    cy.visit('/product/266685');
  });

  it('should contain correct product details', () => {
    cy.get('cx-product-summary .name').should('contain', PRODUCT_NAME);
    cy.get('cx-product-details .code').should('contain', 'ID 266685');
    cy.get('cx-product-details').should(
      'contain',
      '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
    );
  });

  it('should contain correct tabs', () => {
    cy.get('.details > h3')
      .eq(0)
      .should('contain', 'Product Details');
    cy.get('.details > h3')
      .eq(1)
      .should('contain', 'Specs');
    cy.get('.details > h3')
      .eq(2)
      .should('contain', 'Reviews');
    cy.get('.details > h3')
      .eq(3)
      .should('contain', 'Shipping');
  });

  it('should contain tabs with correct text', () => {
    cy.get('.details > h3')
      .eq(0)
      .click();
    cy.get('.details .active .container')
      .should(
        'contain',
        '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
      )
      .should(
        'contain',
        'Can be switched to 10-watt or 20-watt settings (NP-FM50 batteries can only be used at 10-watt setting).'
      )
      .should('contain', 'Includes shoe adaptor for increased functionality.');
    cy.get('.details > h3')
      .eq(1)
      .click();
    cy.get('.details .active .container')
      .should('contain', 'Weight & dimensions')
      .should('contain', 'Colour')
      .should('contain', 'Technical details');
    cy.get('.details > h3')
      .eq(2)
      .click();
    cy.get('.details .active .container').should('contain', 'Overall Rating');
    cy.get('.details > h3')
      .eq(3)
      .click();
    cy.get('.details .active .container').should(
      'contain',
      'Lorem ipsum dolor sit amet,'
    );
  });

  it('should contain correct review tab', () => {
    cy.get('.details > h3')
      .eq(2)
      .click();
    cy.get('cx-product-reviews .review').should('have.length', 5);
    cy.get('cx-product-reviews .header button').should('be.visible');
    cy.get('cx-product-reviews ngb-rating').should('be.visible');
  });

  it('should contain correct review form', () => {
    cy.get('.details > h3')
      .eq(2)
      .click();
    cy.get('cx-product-reviews .header button').click();
    cy.get('cx-product-reviews form').should('be.visible');
    cy.get('cx-product-reviews form')
      .getByText('Cancel')
      .should('be.not.disabled');
    cy.get('cx-product-reviews form')
      .getByText('Submit')
      .should('be.disabled');
    cy.get('cx-product-reviews form input')
      .eq(0)
      .type('My review title');
    cy.get('cx-product-reviews form textarea').type(
      'My best comment I have ever posted'
    );
    cy.get('cx-product-reviews form .star')
      .eq(2)
      .click();
    cy.get('cx-product-reviews form input')
      .eq(1)
      .type('Me');
    cy.get('cx-product-reviews form')
      .getByText('Submit')
      .should('be.not.disabled');
    cy.get('cx-product-reviews form')
      .getByText('Submit')
      .click();
    cy.get('cx-product-reviews form').should('be.not.visible');
    cy.get('cx-product-reviews .review').should('be.visible');
  });

  it('should be able to add different quantities of product to cart', () => {
    // TODO
    // await productDetailsPage.addToCartButton.click();
    // // Added-to-Cart modal opens. Close it.
    // const atcModal = new AddedToCartModal();
    // await atcModal.waitForReady();
    //
    // const item = await atcModal.item;
    // await E2EUtil.wait4VisibleElement(item);
    // expect(await item.getText()).toContain(PRODUCT_NAME);
    //
    // // close modal
    // await atcModal.closeButton.click();
    //
    // // There should be 1 item in cart
    // expect(await header.miniCartButton.getText()).toBe('1');
    //
    // // Let's change qty 3 times (from 1 to 4)
    // for (let i = 0; i <= 2; i++) {
    //   await productDetailsPage.itemCounterUpButton.click();
    // }
    // await productDetailsPage.addToCartButton.click();
    // await atcModal.waitForReady();
    // // close modal
    // await atcModal.closeButton.click();
    //
    // // There should be 5 items in cart
    // expect(await header.miniCartButton.getText()).toBe('5');
  });
});
