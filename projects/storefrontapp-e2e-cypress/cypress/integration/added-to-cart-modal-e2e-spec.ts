const productId = '3595723';
const productId2 = '3325048';

describe('Added to cart modal', () => {
  before(() => {
    cy.visit(`/product/${productId}`);
  });

  it('basic modal behavior', () => {
    // Type 1000 in the input to see if the value will change to maximum 'max stock'
    cy.get('cx-product-summary .cx-item-counter__value')
      .clear()
      .type('1000', { force: true });

    // check if the '+' button is disabled when the quantity is the maximum 'max stock'
    cy.get('cx-product-summary .cx-item-counter__action')
      .contains('+')
      .should('be.disabled');

    // Type 0 in the input to see if the value will change to minimum '1'
    cy.get('cx-product-summary .cx-item-counter__value')
      .clear()
      .type('0', { force: true });

    // check if the '-' button is disabled when the quantity is the minimum '1'
    cy.get('cx-product-summary .cx-item-counter__action')
      .contains('-')
      .should('be.disabled');

    // increase the quantity to 2 and add it to cart
    cy.get('cx-product-summary .cx-item-counter__action')
      .contains('+')
      .click();

    cy.get('cx-product-summary cx-add-to-cart button').click();

    // Check if the text in the cart dialog and product summary in product details matches
    cy.get('cx-added-to-cart-dialog .cx-name').then($cartItem => {
      cy.get('cx-product-summary .name').then($productItem => {
        expect($cartItem.text()).equal($productItem.text());
      });
    });

    // quantity is correctly updated
    cy.get(
      'cx-added-to-cart-dialog .cx-quantity .cx-item-counter__value'
    ).should('have.value', '2');
    cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
      'contain',
      '2 items'
    );

    // check if the total is correct
    cy.get('cx-added-to-cart-dialog .cx-total .cx-value').then(
      $cartTotalItemPrice => {
        const totalPrice = $cartTotalItemPrice.text().trim();
        expect(totalPrice).equal('$4,004.96');
      }
    );

    // action buttons links correctly
    cy.get('cx-added-to-cart-dialog .btn-primary')
      .should('have.attr', 'href')
      .then($href => {
        expect($href).contain('/cart');
      });
    cy.get('cx-added-to-cart-dialog .btn-secondary')
      .should('have.attr', 'href')
      .then($href => {
        expect($href).contain('/checkout');
      });

    // closing modal works
    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();
    cy.get('cx-added-to-cart-dialog').should('not.exist');
  });

  it('adding same product twice to cart', () => {
    // increase the quantity to 3 items of the same product
    cy.get('cx-product-summary .cx-item-counter.btn-group button')
      .contains('+')
      .click();
    cy.get('cx-product-summary cx-add-to-cart button').click();

    // quantity is correctly updated
    cy.get(
      'cx-added-to-cart-dialog .cx-quantity .cx-item-counter__value'
    ).should('have.value', '5');
    cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
      'contain',
      '5 items'
    );

    // closing modal works
    cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click();
    cy.get('cx-added-to-cart-dialog').should('not.exist');
  });

  it('adding different products to cart', () => {
    // uncomment this section after fixing cart resetting on each full page load (issue 787)
    // cy.visit('/');

    // search for new product and select it, and add to cart
    cy.get('cx-searchbox [aria-label="search"]').type(productId2);
    cy.get('cx-searchbox')
      .contains('.cx-search-box__dropdown-content-product', 'DSC-W180')
      .click();
    cy.get('cx-product-summary cx-add-to-cart button').click();

    // quantity is correctly updated
    cy.get(
      'cx-added-to-cart-dialog .cx-quantity .cx-item-counter__value'
    ).should('have.value', '1');
    cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
      'contain',
      '6 items'
    );

    // check if the total is correct
    cy.get('cx-added-to-cart-dialog .cx-total .cx-value').then(
      $cartTotalItemPrice => {
        const totalPrice = $cartTotalItemPrice.text().trim();
        expect(totalPrice).equal('$121.88');
      }
    );

    // navigate to cart details
    cy.get('cx-added-to-cart-dialog .btn-primary').click();
    cy.get('cx-cart-details').should('contain', 'Shopping Cart (ID ');

    // delete a product and check if the total is updated
    cy.get('cx-cart-item-list .cx-item-list-items')
      .contains('.cx-info', 'F 100mm f/2.8L Macro IS USM')
      .find('.cx-actions .link')
      .click();
    cy.get('cx-cart-details').should('contain', 'Cart total (1 items):');

    // check for the other product still exist
    cy.get('cx-cart-item-list .cx-item-list-items')
      .contains('.cx-info', 'DSC-W180')
      .should('be.visible');

    // check the item quantity of the product
    cy.get('cx-cart-item-list .cx-item-list-items')
      .contains('.cx-info', 'DSC-W180')
      .find('.cx-item-counter__value')
      .should('have.value', '1');

    // check the item price of the product
    cy.get('cx-cart-item-list .cx-item-list-items')
      .contains('.cx-info', 'DSC-W180')
      .find('.cx-price .cx-value')
      .then($cartItemPrice => {
        const price = $cartItemPrice.text().trim();
        expect(price).equal('$121.88');
      });

    // check the item price total of the product
    cy.get('cx-cart-item-list .cx-item-list-items')
      .contains('.cx-info', 'DSC-W180')
      .find('.cx-total .cx-value')
      .then($cartTotalItemPrice => {
        const totalPrice = $cartTotalItemPrice.text().trim();
        expect(totalPrice).equal('$121.88');
      });

    // delete the last product in cart
    cy.get('cx-cart-item-list .cx-item-list-items')
      .contains('.cx-info', 'DSC-W180')
      .find('.cx-actions .link')
      .click();

    // check if the cart is empty
    cy.get('cx-paragraph').should('contain', 'Your shopping cart is empty');
  });

  it('refreshing page should not show modal', () => {
    cy.visit(`/product/${productId}`);

    cy.get('cx-product-summary cx-add-to-cart button').click();

    cy.visit(`/product/${productId}`);

    cy.get('cx-added-to-cart-dialog').should('not.exist');
  });

  it('total price is correctly estimated', () => {
    // helper function to prettify the text
    function extractPriceFromText(text) {
      return parseFloat(
        text
          .trim()
          .substring(1)
          .replace(',', '')
      );
    }

    cy.visit(`/product/${productId}`);

    // increase the quantity to 2 and add it to cart
    cy.get('cx-product-summary .cx-item-counter.btn-group button')
      .contains('+')
      .click();
    cy.get('cx-product-summary cx-add-to-cart button').click();

    // check if the item price * quantity matches the total
    cy.get('cx-added-to-cart-dialog').within(() => {
      cy.get('.cx-price .cx-value').then($itemPrice => {
        cy.get('.cx-quantity .cx-item-counter__value').then($itemQuantity => {
          cy.get('.cx-total .cx-value').then($itemTotalPrice => {
            expect(extractPriceFromText($itemTotalPrice.text())).equal(
              extractPriceFromText($itemPrice.text()) *
                parseInt($itemQuantity.val().toString(), 10)
            );
          });
        });
      });
    });
  });
});
