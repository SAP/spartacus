/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { login } from '../../../../helpers/auth-forms';
import * as cart from '../../../../helpers/cart';
import * as checkout from '../../../../helpers/checkout-flow';
import { waitForPage } from '../../../../helpers/navigation';
import { getSampleUser } from '../../../../sample-data/checkout-flow';

context('Assisted Service Module', () => {
  describe('Bind cart', () => {
    it('should be able to bind anonymous cart to customer (CXSAP-153)', () => {
      const customer = getSampleUser();

      let anonymousCartCode: string;
      checkout.visitHomePage();
      cy.get('cx-asm-main-ui').should('not.exist');

      checkout.registerUser(false, customer);

      cy.log('--> Add to cart as an anonymous user');
      cart.addProductAsAnonymous();

      cy.log('--> Retrieve cart id');
      cart.goToCart();
      cy.get('cx-cart-details')
        .get('h2.cx-total')
        .then(($cartId) => {
          // localStorage contains anonymous cart uid, read code from UI
          const text = $cartId.text();
          anonymousCartCode = text.replace('Cart #', '').trim();

          cy.log('--> Agent logging in');
          checkout.visitHomePage('asm=true');
          cy.get('cx-asm-main-ui').should('exist');
          cy.get('cx-asm-main-ui').should('be.visible');
          asm.agentLogin('asagent', 'pw4all');

          cy.log('--> Starting customer emulation');
          asm.startCustomerEmulation(customer);

          cy.log('--> Enter users cart number');
          cy.get(
            'cx-customer-emulation input[formcontrolname="cartNumber"]'
          ).type(anonymousCartCode);
        });

      cy.log('--> Agent binding cart');
      asm.bindCart();

      cy.log('--> Verify the agent sees the anonymous cart');
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        expect(customerCartCode).to.equal(anonymousCartCode);
      });

      cy.log(
        '--> Stop customer emulation using the end session button in the ASM UI'
      );
      asm.agentSignOut();

      cy.get('cx-asm-main-ui').should('exist');

      cy.log('--> Log in as customer');
      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.visit('/login');
      cy.wait(`@${loginPage}`);
      login(customer.email, customer.password);
      cy.wait('@csAgentAuthentication');

      cy.log("--> Verify anonymous cart is now the user's active cart");
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        expect(customerCartCode).to.equal(anonymousCartCode);
      });
    });

    it('should be able to replace current customer cart with anonymous cart (CXSAP-153)', () => {
      const customer = getSampleUser();

      checkout.visitHomePage();
      cy.get('cx-asm-main-ui').should('not.exist');

      checkout.registerUser(false, customer);

      cy.log('--> Add to cart as an anonymous user');
      cart.addProductAsAnonymous();

      cy.log('--> Retrieve cart id');
      cart.goToCart();
      cy.get('cx-cart-details')
        .get('h2.cx-total')
        .then(($cartId) => {
          // localStorage contains anonymous cart uid, but need cart code.  read cart code from UI
          const text = $cartId.text();
          const anonymousCartCode = text.replace('Cart #', '').trim();
          cy.wrap(anonymousCartCode).as('anonymousCartCode');
        });
      cy.get<string>('@anonymousCartCode').then((anonymousCartCode) => {
        cy.log(`--> Anonymous cart id: ${anonymousCartCode}`);
      });

      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Starting customer emulation');
      asm.startCustomerEmulation(customer);

      cy.log('--> Create current active cart');
      cart.addProductFromPdp(cart.products[1].code).then(() => {
        const activeCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        cy.wrap(activeCartCode).as('activeCartCode');
      });
      cy.get<string>('@activeCartCode').then((activeCartCode) => {
        cy.log(`---> Current active cart: ${activeCartCode}`);
      });

      cy.log('--> Enter users cart number');
      cy.get<string>('@anonymousCartCode').then((anonymousCartCode) => {
        cy.get('cx-customer-emulation input[formcontrolname="cartNumber"]')
          .clear()
          .type(anonymousCartCode);
      });

      cy.log('--> Agent binding cart');
      cy.get<string>('@activeCartCode').then((activeCartCode) => {
        asm.bindCart({
          dialogAction: 'replace',
          previousCart: activeCartCode,
        });
      });

      cy.log('--> Verify the agent sees the anonymous cart');
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        cy.get<string>('@anonymousCartCode').then((anonymousCartCode) => {
          expect(customerCartCode).to.equal(anonymousCartCode);
        });
      });

      cy.log(
        '--> Stop customer emulation using the end session button in the ASM UI'
      );
      asm.agentSignOut();

      cy.get('cx-asm-main-ui').should('exist');

      cy.log('--> Log in as customer');
      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.visit('/login');
      cy.wait(`@${loginPage}`);
      login(customer.email, customer.password);
      cy.wait('@csAgentAuthentication');

      cy.log("--> Verify anonymous cart is now the user's active cart");
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        cy.get<string>('@anonymousCartCode').then((anonymousCartCode) => {
          expect(customerCartCode).to.equal(anonymousCartCode);
        });
      });
    });
  });
});
