import { viewportContext } from '../../helpers/viewport-context';
import { interceptGet } from '../../support/utils/intercept';

const productId = '3595723';
const productId2 = '4812254';
const productName2 = '500D + 18-55mm IS + EF-S 55-250 IS';

describe('Added to cart modal - Anonymous user', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit(`/product/${productId}`);
    });

    it('should test item counter on PDP', () => {
      interceptGet('getProduct', '/products/*?fields=*stock*');
      cy.wait('@getProduct').then((xhr) => {
        const stock = xhr.response.body.stock.stockLevel;

        // Value change to 'max stock'. '+' button disabled
        cy.get('cx-add-to-cart cx-item-counter').within(() => {
          cy.get('input')
            .type('{selectall}{backspace}1000')
            .blur()
            .should('have.value', stock);

          cy.get('button').contains('+').should('be.disabled');

          // Value should change to minimum, '-' button disabled
          cy.get('input')
            .type('{selectall}{backspace}0')
            .blur()
            .should('have.value', '1');

          cy.get('button').contains('-').should('be.disabled');
        });
      });
    });

    it('Should add products to cart', () => {
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-dialog').within(() => {
        //check for initial default values
        cy.get('.cx-quantity cx-item-counter input').should('have.value', '1');
        cy.get('.cx-dialog-total').should('contain', '1 item');
        cy.get('[aria-label="Close Modal"]').click();
      });

      // add same product to cart again
      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.get('.cx-quantity cx-item-counter input').should('have.value', '2');
        cy.get('.cx-dialog-total').should('contain', '2 items');

        // action buttons links correctly
        cy.get('.btn-primary')
          .should('have.attr', 'href')
          .then(($href) => {
            expect($href).contain('/cart');
          });
        cy.get('.btn-secondary')
          .should('have.attr', 'href')
          .then(($href) => {
            expect($href).contain('/checkout');
          });

        cy.get('[aria-label="Close Modal"]').click();
      });
      cy.get('cx-added-to-cart-dialog').should('not.exist');

      cy.onMobile(() => {
        cy.get('cx-searchbox button.search').click();
      });

      // search for new product and select it, and add to cart
      cy.get('cx-searchbox input[aria-label="Search"]').type(productId2);
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

      interceptGet('getRefreshedCart', '/users/anonymous/carts/*');

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
      //TODO compare item price and total price with backend values
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .find('.cx-total .cx-value')
        .then(($cartTotalItemPrice) => {
          const totalPrice = $cartTotalItemPrice.text().trim();
          expect(totalPrice).equal('$927.89');
        });

      cy.wait('@getRefreshedCart');
      // delete the last product in cart
      cy.get('cx-cart-item-list .cx-item-list-items')
        .contains('.cx-info', productName2)
        .find('.cx-actions .cx-remove-btn > .link')
        .click();

      // check if the cart is empty
      cy.get('cx-paragraph').should('contain', 'Your shopping cart is empty');
    });

    it('Should not show cart modal when page is refreshed', () => {
      cy.visit(`/product/${productId}`);

      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
        'contain',
        '1 item'
      );

      cy.reload();

      cy.get('cx-added-to-cart-dialog').should('not.exist');
    });
  });
});
