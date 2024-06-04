/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';
import { interceptGet, interceptPost } from '../../../support/utils/intercept';
import { removeCartItem } from '../../../helpers/cart';

const productId = '266685';
const productId2 = '2006139';
const productName2 = 'M340';

describe('Added to cart modal - Anonymous user', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit(`/product/${productId}`);
    });

    it('should test item counter on PDP', () => {
      interceptGet('getProductStock', '/products/*?fields=*stock*');
      cy.wait('@getProductStock').then((xhr) => {
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

      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.get('.cx-quantity cx-item-counter input').should('have.value', '2');
        cy.get('.cx-dialog-total').should('contain', '2 items');

        // check action button links
        cy.get('button.btn-primary').scrollIntoView().should('be.visible');
        cy.get('button.btn-secondary').should('be.visible');

        cy.get('[aria-label="Close Modal"]').click();
      });

      cy.get('cx-added-to-cart-dialog').should('not.exist');

      cy.visit(`/product/${productId2}`);
      cy.get('cx-breadcrumb h1').contains(productName2);

      interceptPost('addCartEntry', '/users/anonymous/carts/*/entries?*');
      cy.get('cx-add-to-cart button[type=submit]').click();

      let cartEntryPrice: string;
      cy.wait('@addCartEntry').then((xhr) => {
        cartEntryPrice = xhr.response.body.entry.totalPrice.value;

        cy.get('cx-added-to-cart-dialog').within(() => {
          cy.get('.cx-quantity cx-item-counter input').should(
            'have.value',
            '1'
          );
          cy.get('.cx-dialog-total').should('contain', '3 items');

          // check if the total is correct
          cy.get('.cx-total .cx-value').contains(cartEntryPrice);
          // navigate to cart details
          cy.get('.btn-primary').click();
        });

        cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');

        interceptGet('getRefreshedCart', '/users/anonymous/carts/*');

        // delete a product and check if the total is updated
        removeCartItem({ name: 'Battery Video Light' });

        cy.get('cx-cart-details').should('contain', 'Cart #');

        // check for the other product still exist
        cy.get('cx-cart-item-list')
          .contains('tr[cx-cart-item-list-row]', productName2)
          .should('be.visible')
          .within(() => {
            cy.get('.cx-price:not(.cx-mobile-only) .cx-value').should(
              'contain',
              cartEntryPrice
            );
            cy.get('.cx-total .cx-value').should('contain', cartEntryPrice);
            cy.get('cx-item-counter input').should('have.value', '1');

            cy.wait('@getRefreshedCart');
          });
        // delete the last product in cart
        removeCartItem({ name: productName2 });

        cy.get('cx-paragraph').should('contain', 'Your shopping cart is empty');
      });
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
