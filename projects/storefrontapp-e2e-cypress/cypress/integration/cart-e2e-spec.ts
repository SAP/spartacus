const PRODUCT_CODE_1 = '1934793';
const PRODUCT_CODE_2 = '300938';
const PRODUCT_CODE_3 = '3470545';
const PRODUCT_CODE_4 = '29925';
const PRODUCT_TYPE = 'camera';

describe('Cart', () => {
  before(() => {
    cy.visit('/');
  });

  it('should add products to cart via search autocomplete', () => {
    cy.get('cx-searchbox input').type(PRODUCT_CODE_1);
    cy.get('.dropdown-item.active').click();

    cy.get('cx-product-summary cx-add-to-cart button').click();
    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();

    const miniCart = cy.get('cx-mini-cart');
    miniCart.within(() => {
      cy.get('.count').should('contain', 1);
    });
    miniCart.click();

    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'PowerShot A480')
      .within(() => {
        cy.get('.cx-price>.cx-value').should('contain', '$99.85');
        cy.get('.cx-item-counter__value').should('have.value', '1');
        cy.get('.cx-total>.cx-value').should('contain', '$99.85');
      });
  });

  it('should add products to cart through search result page', () => {
    cy.get('cx-searchbox input').type(`${PRODUCT_TYPE}{enter}`);
    cy.get('cx-product-list')
      .contains('cx-product-list-item', 'Photosmart E317 Digital')
      .within(() => {
        cy.get('cx-add-to-cart button').click();
      });

    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();

    const miniCart = cy.get('cx-mini-cart');
    miniCart.within(() => {
      cy.get('.count').should('contain', 2);
    });
    miniCart.click();

    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'Photosmart E317 Digital Camera')
      .within(() => {
        cy.get('.cx-price>.cx-value').should('contain', '$114.12');
        cy.get('.cx-item-counter__value').should('have.value', '1');
        cy.get('.cx-total>.cx-value').should('contain', '$114.12');
      });
  });

  it('should display empty cart if no items added and when items are removed', () => {
    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'PowerShot A480')
      .within(() => {
        cy.getByText('Remove').click();
      });

    cy.get('cx-cart-details .cx-total').should(
      'contain',
      'Cart total (1 items)'
    );

    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'Photosmart E317 Digital Camera')
      .within(() => {
        cy.getByText('Remove').click();
      });

    cy.get('.EmptyCartMiddleContent').should(
      'contain',
      'Your shopping cart is empty'
    );
  });

  xit('should add product to cart as anonymous and merge when logged in', () => {
    cy.requireLoggedIn();

    cy.get('cx-searchbox input').type(PRODUCT_CODE_2);
    cy.get('.dropdown-item.active').click();
    cy.get('cx-product-summary cx-add-to-cart button').click();
    cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
      'contain',
      'Cart total (1 items)'
    );
    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();

    cy.window().then(win => win.sessionStorage.clear());
    cy.getByTitle('SAP Commerce').click();

    cy.get('cx-searchbox input').type(`${PRODUCT_CODE_3}{enter}`);
    cy.get('cx-product-list')
      .contains('cx-product-list-item', 'EASYSHARE M381')
      .within(() => {
        cy.get('cx-add-to-cart button').click();
      });

    cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
      'contain',
      'Cart total (1 items)'
    );
    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();

    cy.requireLoggedIn();
    cy.getByTitle('SAP Commerce').click();

    const miniCart = cy.get('cx-mini-cart');
    miniCart.within(() => {
      cy.get('.count').should('contain', 2);
    });
    miniCart.click();
  });

  it('should add product to cart and manipulate quantity', () => {
    cy.visit(`/product/${PRODUCT_CODE_2}`);
    cy.get('cx-product-summary cx-add-to-cart button').click();
    cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
      'contain',
      'Cart total (1 items)'
    );
    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();

    const miniCart = cy.get('cx-mini-cart');
    miniCart.within(() => {
      cy.get('.count').should('contain', 1);
    });
    miniCart.click();

    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'Photosmart E317 Digital Camera')
      .within(() => {
        cy.get('.cx-price>.cx-value').should('contain', '$114.12');
        cy.get('.cx-item-counter__value').should('have.value', '1');
        cy.get('.cx-total>.cx-value').should('contain', '$114.12');

        cy.get('.cx-item-counter__action')
          .contains('+')
          .click();
      });

    cy.get('cx-cart-details .cx-total').should(
      'contain',
      'Cart total (2 items)'
    );

    cy.get('cx-order-summary')
      .contains('.cx-summary-row', 'Subtotal:')
      .get('.cx-summary-amount')
      .should('contain', '$208.24');

    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'Photosmart E317 Digital Camera')
      .within(() => {
        cy.get('.cx-price>.cx-value').should('contain', '$114.12');
        cy.get('.cx-item-counter__value').should('have.value', '2');
        cy.get('.cx-total>.cx-value').should('contain', '$228.24');

        cy.get('.cx-item-counter__action')
          .contains('+')
          .click();
      });

    cy.get('cx-cart-details .cx-total').should(
      'contain',
      'Cart total (3 items)'
    );

    cy.get('cx-order-summary')
      .contains('.cx-summary-row', 'Subtotal:')
      .get('.cx-summary-amount')
      .should('contain', '$322.36');

    cy.get('cx-cart-item-list')
      .contains('cx-cart-item', 'Photosmart E317 Digital Camera')
      .within(() => {
        cy.get('.cx-price>.cx-value').should('contain', '$114.12');
        cy.get('.cx-item-counter__value').should('have.value', '3');
        cy.get('.cx-total>.cx-value').should('contain', '$342.36');
      });
  });

  it('should be unable to add out of stock products to cart', () => {
    cy.visit(`/product/${PRODUCT_CODE_4}`);

    cy.get('cx-product-summary .quantity').should('contain', 'Out of stock');
    cy.get('cx-product-summary cx-add-to-cart button').should('not.exist');
  });
});
