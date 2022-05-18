import { should } from 'chai';
import { doPlaceOrder, orderHistoryTest } from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';
import { product } from '../../../sample-data/checkout-flow';
import { waitForOrderWithConsignmentToBePlacedRequest } from '../../../support/utils/order-placed';

describe('Order History with orders', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    orderHistoryTest.checkIfOrderIsDisplayed();
    orderHistoryTest.checkSortingByCode();
    orderHistoryTest.checkCorrectDateFormat();
  });
});

describe('Order details page', () => {
  viewportContext(['mobile', 'desktop'], () => {
    let formattedValue: any;

    orderHistoryTest.checkOrderDetailsUnconsignedEntries();

    before(() => {
      cy.requireLoggedIn();
      doPlaceOrder().then((orderData: any) => {
        formattedValue = orderData.body.totalPrice.formattedValue;
        cy.waitForOrderToBePlacedRequest(
          undefined,
          undefined,
          orderData.body.code
        );
        cy.visit('/my-account/orders');
        cy.get('.cx-order-history-code > .cx-order-history-value')
          .then((el) => {
            const orderNumber = el.text().match(/\d+/)[0];
            waitForOrderWithConsignmentToBePlacedRequest(orderNumber);
            return cy.wrap(el);
          })
          .first()
          .click();
      });

      it('should display order details page with consigned entries', () => {
        cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
        cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
        cy.get('.cx-summary-total > .cx-summary-amount').should(
          'contain',
          formattedValue
        );
      });
    });

    it('should add product to cart from order details page', () => {
      // element.should('contain', 'Buy It Again');
      cy.get('.cx-item-list-row .cx-action-link').should(
        'contain',
        'Buy It Again'
      );
      cy.intercept(
        'POST',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/${Cypress.env(
          'OCC_PREFIX_USER_ENDPOINT'
        )}/*/carts/*/entries?*lang=en&curr=USD`
      ).as('add_to_cart');

      cy.intercept(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/cms/pages?pageType=ContentPage&pageLabelOrId=%2Fcart&lang=en&curr=USD`
      ).as('cart_page');

      cy.get('.cx-item-list-row .cx-action-link').click();

      cy.wait('@add_to_cart');

      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.get('.cx-dialog-buttons>.btn-primary').click();
      });

      cy.wait(200);

      cy.get('cx-cart-item-list')
        .contains('.cx-item-list-row', name)
        .within(() => {
          cy.get('.cx-code').should('contain', product.code);
          cy.get('cx-item-counter input').should('have.value', '1');
        });
    });
  });
});
