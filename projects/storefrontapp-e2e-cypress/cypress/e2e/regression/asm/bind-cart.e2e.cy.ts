/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { agentLoginForJDK21, login } from '../../../helpers/auth-forms';
import * as cart from '../../../helpers/cart';
import * as checkout from '../../../helpers/checkout-flow';
import { waitForPage } from '../../../helpers/navigation';
import { getB2CAgent } from '../../../sample-data/asm-flow';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { visitLoginPage } from '../../../support/utils/login';

const b2cAgent = getB2CAgent();

context('Assisted Service Module', () => {
  describe('Bind cart', () => {
    const customerForBindCart = getSampleUser();
    let anonymousCartCodeForBindCart: string;

    it('should be able to bind anonymous cart to customer (CXSAP-153)', () => {
      checkout.visitHomePage();
      cy.get('cx-asm-main-ui').should('not.exist');

      checkout.registerUser(false, customerForBindCart);

      cy.whenJDK21(() => {
        checkout.visitHomePage();
      });

      cy.log('--> Add to cart as an anonymous user');
      cart.addProductAsAnonymous();

      cy.log('--> Retrieve cart id');
      cart.goToCart();
      cy.get('cx-cart-details')
        .get('h2.cx-total')
        .then(($cartId) => {
          // localStorage contains anonymous cart uid, read code from UI
          const text = $cartId.text();
          anonymousCartCodeForBindCart = text.replace('Cart #', '').trim();

          cy.log('--> Agent logging in');
          checkout.visitHomePage('asm=true');
          cy.get('cx-asm-main-ui').should('exist');
          cy.get('cx-asm-main-ui').should('be.visible');
          cy.whenJDK17(() => {
            asm.agentLogin(b2cAgent.userName, b2cAgent.password);
          });

          cy.whenJDK21(() => {
            cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
            agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
          });

          cy.log('--> Starting customer emulation');
          asm.startCustomerEmulation(customerForBindCart);

          cy.log('--> Enter users cart number');
          cy.get(
            'cx-customer-emulation input[formcontrolname="cartNumber"]'
          ).type(anonymousCartCodeForBindCart);
        });

      cy.log('--> Agent binding cart');
      asm.bindCart();

      cy.log('--> Verify the agent sees the anonymous cart');
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        expect(customerCartCode).to.equal(anonymousCartCodeForBindCart);
      });
    });

    it(`Verify anonymous cart is now the user's active cart for bind cart (CXSAP-153)`, () => {
      cy.log('--> Log in as customer');
      cy.whenJDK17(() => {
        const loginPage = waitForPage('/login', 'getLoginPage');
        visitLoginPage();
        cy.wait(`@${loginPage}`);
      });
      cy.whenJDK21(() => {
        checkout.visitHomePage('asm=true');
        cy.get('button.close[title="Close ASM"]').click();
        cy.get('a[role="link"]').contains('Sign In / Register').click();
      });
      login(customerForBindCart.email, customerForBindCart.password);
      cy.get('cx-login .cx-login-greet').should('be.visible');

      cy.log("--> Verify anonymous cart is now the user's active cart");
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        expect(customerCartCode).to.equal(anonymousCartCodeForBindCart);
      });
    });

    const customerForReplaceBindCart = getSampleUser();
    let anonymousCartCodeForReplaceBindCart: string;
    it('should be able to replace current customer cart with anonymous cart (CXSAP-153)', () => {
      checkout.visitHomePage();
      cy.get('cx-asm-main-ui').should('not.exist');

      checkout.registerUser(false, customerForReplaceBindCart);

      cy.whenJDK21(() => {
        checkout.visitHomePage();
      });

      cy.log('--> Add to cart as an anonymous user');
      cart.addProductAsAnonymous();

      cy.log('--> Retrieve cart id');
      cart.goToCart();
      cy.get('cx-cart-details')
        .get('h2.cx-total')
        .then(($cartId) => {
          // localStorage contains anonymous cart uid, but need cart code.  read cart code from UI
          const text = $cartId.text();
          anonymousCartCodeForReplaceBindCart = text
            .replace('Cart #', '')
            .trim();
          cy.wrap(anonymousCartCodeForReplaceBindCart).as('anonymousCartCode');
        });
      cy.get<string>('@anonymousCartCode').then((anonymousCartCode) => {
        cy.log(`--> Anonymous cart id: ${anonymousCartCode}`);
      });

      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      cy.whenJDK17(() => {
        asm.agentLogin(b2cAgent.userName, b2cAgent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
      });
      cy.log('--> Starting customer emulation');
      asm.startCustomerEmulation(customerForReplaceBindCart);

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
    });

    it(`Verify anonymous cart is now the user's active cart for replace bind cart (CXSAP-153)`, () => {
      cy.log('--> Log in as customer');
      cy.whenJDK17(() => {
        const loginPage = waitForPage('/login', 'getLoginPage');
        visitLoginPage();
        cy.wait(`@${loginPage}`);
      });
      cy.whenJDK21(() => {
        checkout.visitHomePage('asm=true');
        cy.get('button.close[title="Close ASM"]').click();
        cy.get('a[role="link"]').contains('Sign In / Register').click();
      });
      login(
        customerForReplaceBindCart.email,
        customerForReplaceBindCart.password
      );
      cy.get('cx-login .cx-login-greet').should('be.visible');

      cy.log("--> Verify anonymous cart is now the user's active cart");
      cart.goToCart();
      cy.get('cx-cart-details').then(() => {
        const customerCartCode = JSON.parse(
          window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
        ).active;
        expect(customerCartCode).to.equal(anonymousCartCodeForReplaceBindCart);
      });
    });
  });
});
