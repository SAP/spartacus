import { SampleUser, user } from '../sample-data/checkout-flow';
import { login } from './auth-forms';
import {
  replenishmentOrderHistoryHeaderValue,
  replenishmentOrderHistoryUrl,
} from './b2b/b2b-replenishment-order-history';
import { waitForPage } from './checkout-flow';
import { checkBanner, clickHamburger } from './homepage';
import { switchLanguage } from './language';

const orderHistoryLink = '/my-account/orders';

export function doPlaceOrder(productData?: any) {
  let stateAuth: any;

  return cy
    .window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      stateAuth = token;
      return cy.requireProductAddedToCart(stateAuth, productData);
    })
    .then(({ cartId }) => {
      cy.requireShippingAddressAdded(user.address, stateAuth, cartId);
      cy.requireShippingMethodSelected(stateAuth, cartId);
      cy.requirePaymentDone(stateAuth, cartId);

      return cy.requirePlacedOrder(stateAuth, cartId);
    });
}

export const orderHistoryTest = {
  // no orders flow
  checkRedirectNotLoggedInUser(url: string = orderHistoryLink) {
    it('should redirect to login page if user is not logged in', () => {
      cy.visit(url);
      cy.url().should('contain', '/login');
      cy.get('cx-login').should('contain', 'Sign In / Register');
    });
  },
  checkRedirectLoggedInUser(
    sampleUser: SampleUser = user,
    url: string = orderHistoryLink
  ) {
    it('should go to Order History once user has logged in', () => {
      login(sampleUser.email, sampleUser.password);
      cy.url().should('contain', url);
      if (url === replenishmentOrderHistoryUrl) {
        cy.get('.cx-replenishment-order-history-header h3').should(
          'contain',
          replenishmentOrderHistoryHeaderValue
        );
      } else {
        cy.get('.cx-order-history-header h3').should(
          'contain',
          'Order history'
        );
      }
    });
  },
  checkStartShoppingButton() {
    it('should be able to start shopping from an empty Order History', () => {
      const homePage = waitForPage('homepage', 'getHomePage');

      cy.get('.btn.btn-primary.btn-block.active')
        .findByText('Start Shopping')
        .click();

      cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
      checkBanner();
    });
  },
  // orders flow
  checkIfOrderIsDisplayed() {
    it('should display placed order in Order History', () => {
      doPlaceOrder().then(() => {
        doPlaceOrder().then((orderData: any) => {
          cy.waitForOrderToBePlacedRequest(
            undefined,
            undefined,
            orderData.body.code
          );
          cy.visit('/my-account/orders');
          cy.get('cx-order-history h3').should('contain', 'Order history');
          cy.get('.cx-order-history-code > .cx-order-history-value').should(
            'contain',
            orderData.body.code
          );
          cy.get('.cx-order-history-total > .cx-order-history-value').should(
            'contain',
            orderData.body.totalPrice.formattedValue
          );
        });
      });
    });
  },
  checkSortingByCode() {
    it('should sort the orders table by given code', () => {
      cy.intercept('GET', /sort=byOrderNumber/).as('query_order_asc');
      cy.visit('/my-account/orders');
      cy.get('.top cx-sorting .ng-select').ngSelect('Order Number');
      cy.wait('@query_order_asc').its('response.statusCode').should('eq', 200);
      cy.get('.cx-order-history-code > .cx-order-history-value').then(
        ($orders) => {
          expect(parseInt($orders[0].textContent, 10)).to.be.lessThan(
            parseInt($orders[1].textContent, 10)
          );
        }
      );
    });
  },
  checkCorrectDateFormat() {
    it('should show correct date format', () => {
      cy.intercept('GET', /users\/current\/orders/).as('getOrderHistoryPage');

      cy.visit('/my-account/orders');

      // to compare two dates (EN and DE) we have to compare day numbers
      // EN: "June 15, 2019"
      // DE: "15. Juni, 2019"

      const getDayNumber = (element: any) =>
        element.text().replace(',', '').replace('.', '').split(' ');
      let dayNumberEN: string;

      cy.wait('@getOrderHistoryPage')
        .its('response.statusCode')
        .should('eq', 200);

      cy.onMobile(() => {
        clickHamburger();
      });
      switchLanguage('en');

      cy.get('.cx-order-history-placed > .cx-order-history-value')
        .first()
        .then((element) => {
          dayNumberEN = getDayNumber(element)[1];
        });

      cy.onMobile(() => {
        clickHamburger();
      });
      switchLanguage('de');

      cy.get('.cx-order-history-placed > .cx-order-history-value')
        .first()
        .then((element) => {
          expect(getDayNumber(element)[0]).to.eq(dayNumberEN);
        });

      cy.onMobile(() => {
        clickHamburger();
      });
      switchLanguage('en'); // switch language back
    });
  },
};
