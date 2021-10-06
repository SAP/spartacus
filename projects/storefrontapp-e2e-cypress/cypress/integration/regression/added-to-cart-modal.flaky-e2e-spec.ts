import { viewportContext } from '../../helpers/viewport-context';

const productId = '3595723';
const productId2 = '4812254';
const productName2 = '500D + 18-55mm IS + EF-S 55-250 IS';

describe('Added to cart modal', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit(`/product/${productId}`);
    });

    it('testing itemCounter on PDP', () => {
      // Type 1000 in the input to see if the value will change to maximum 'max stock'
      cy.get('cx-add-to-cart cx-item-counter input')
        .type('{selectall}{backspace}')
        .type('1000')
        .blur()
        .should('have.value', '98');

      // check if the '+' button is disabled when the quantity is the maximum 'max stock'
      cy.get('cx-add-to-cart cx-item-counter button')
        .contains('+')
        .should('be.disabled');

      // Type 0 in the input to see if the value will change to minimum '1'
      cy.get('cx-add-to-cart cx-item-counter input')
        .type('{selectall}{backspace}')
        .type('0')
        .blur()
        .should('have.value', '1');

      // check if the '-' button is disabled when the quantity is the minimum '1'
      cy.get('cx-add-to-cart cx-item-counter button')
        .contains('-')
        .should('be.disabled');
    });

    it('adding same product twice to cart', () => {
      // add a product to cart
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get(
        'cx-added-to-cart-dialog .cx-quantity cx-item-counter input'
      ).should('have.value', '1');
      cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
        'contain',
        '1 item'
      );
      cy.get('cx-added-to-cart-dialog [aria-label="Close Modal"]').click();

      // add same product to cart again
      cy.get('cx-add-to-cart button[type=submit]').click();

      // quantity is correctly updated
      cy.get(
        'cx-added-to-cart-dialog .cx-quantity cx-item-counter input'
      ).should('have.value', '2');
      cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
        'contain',
        '2 items'
      );

      // action buttons links correctly
      cy.get('cx-added-to-cart-dialog .btn-primary')
        .should('have.attr', 'href')
        .then(($href) => {
          expect($href).contain('/cart');
        });
      cy.get('cx-added-to-cart-dialog .btn-secondary')
        .should('have.attr', 'href')
        .then(($href) => {
          expect($href).contain('/checkout');
        });

      // closing modal works
      cy.get('cx-added-to-cart-dialog [aria-label="Close Modal"]').click();
      cy.get('cx-added-to-cart-dialog').should('not.exist');
    });

    it('adding different products to cart', () => {
      cy.onMobile(() => {
        cy.get('cx-searchbox button.search').click();
      });

      // search for new product and select it, and add to cart
      cy.get('cx-searchbox input[aria-label="Search"]').type(productId2, {
        force: true,
      });
      cy.onDesktop(() => {
        cy.get('cx-searchbox')
          .contains('.results .products .name', productName2.substr(0, 12))
          .click();
      });
      cy.onMobile(() => {
        // we don't show product in search suggestions on mobile
        // instead search and click first result
        cy.get('cx-searchbox input[aria-label="Search"]').type('{enter}');
        cy.get('cx-product-list-item').first().get('.cx-product-name').click();
      });
      cy.get('cx-breadcrumb h1').contains(productName2);
      cy.get('cx-add-to-cart button[type=submit]').click();

      // quantity is correctly updated
      cy.get(
        'cx-added-to-cart-dialog .cx-quantity cx-item-counter input'
      ).should('have.value', '1');
      cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
        'contain',
        '3 items'
      );

      // check if the total is correct
      cy.get('cx-added-to-cart-dialog .cx-total .cx-value').then(
        ($cartTotalItemPrice) => {
          const totalPrice = $cartTotalItemPrice.text().trim();
          expect(totalPrice).equal('$927.89');
        }
      );

      // navigate to cart details
      cy.get('cx-added-to-cart-dialog .btn-primary').click();
      cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');

      cy.intercept({
        method: 'GET',
        path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/anonymous/carts/*`,
      }).as('getRefreshedCart');

      // delete a product and check if the total is updated
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', 'F 100mm f/2.8L Macro IS USM')
        .find('.cx-actions .cx-remove-btn > .link')
        .click();
      cy.get('cx-cart-details').should('contain', 'Cart #');

      // check for the other product still exist
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .should('be.visible');

      // check the item quantity of the product
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .find('cx-item-counter input')
        .should('have.value', '1');

      // check the item price of the product
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .find('.cx-price .cx-value')
        .then(($cartItemPrice) => {
          const price = $cartItemPrice.text().trim();
          expect(price).equal('$927.89');
        });

      // check the item price total of the product
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .find('.cx-total .cx-value')
        .then(($cartTotalItemPrice) => {
          const totalPrice = $cartTotalItemPrice.text().trim();
          expect(totalPrice).equal('$927.89');
        });

      cy.wait('@getRefreshedCart').its('response.statusCode').should('eq', 200);
      // delete the last product in cart
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .find('.cx-actions .cx-remove-btn > .link')
        .click();

      // check if the cart is empty
      cy.get('cx-paragraph').should('contain', 'Your shopping cart is empty');
    });

    it('refreshing page should not show modal', () => {
      cy.visit(`/product/${productId}`);

      cy.get('cx-add-to-cart button[type=submit]').click();

      // verify that the item has been added to the cart
      cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
        'contain',
        '1 item'
      );

      cy.reload();

      // verify that the dialog closes
      cy.get('cx-added-to-cart-dialog').should('not.exist');

      //empty the cart
      cy.visit('/cart');
      cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', 'F 100mm f/2.8L Macro IS USM')
        .find('.cx-actions .cx-remove-btn > .link')
        .click();
      cy.get('cx-paragraph').should('contain', 'Your shopping cart is empty');
    });

    it('total price is correctly estimated', () => {
      // helper function to prettify the text
      function extractPriceFromText(text) {
        return parseFloat(text.trim().substring(1).replace(',', ''));
      }

      cy.visit(`/product/${productId}`);

      // increase the quantity to 2 and add it to cart
      cy.get('cx-add-to-cart cx-item-counter button').contains('+').click();
      cy.get('cx-add-to-cart button[type=submit]').click();
      // check if the item price * quantity matches the total
      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.get('.cx-price .cx-value').then(($itemPrice) => {
          cy.get('.cx-quantity cx-item-counter input').then(($itemQuantity) => {
            cy.get('.cx-total .cx-value').then(($itemTotalPrice) => {
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
});
