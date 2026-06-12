/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkoutFlow from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

/**
 * Test suite for cart race-condition scenarios on a slow network.
 *
 * Two issues are covered:
 *
 * 1. Concurrent createCart() requests during rapid add-to-cart clicks must
 *    collapse to a single backend cart (shareReplay caching in
 *    active-cart.service.ts → requireLoadedCart()).
 *
 * 2. CXSPA-10582 phantom-cart: a Place Order click while a CartAddEntry is
 *    still queued in the addEntry$ effect's concatMap must not be allowed —
 *    otherwise the queued POST .../entries lands after the cart is removed
 *    server-side and lazily creates a phantom cart B. The fix gates the
 *    Place Order button on ActiveCartFacade.isStable().
 */
describe('Cart Race Condition - Slow Network', () => {
  const products = [
    { code: '1934793', name: 'PowerShot A480' },
    { code: '300938', name: 'Photosmart E317 Digital Camera' },
    { code: '3470545', name: 'EASYSHARE M381' },
  ];

  const SLOW_NETWORK_DELAY_MS = 2000;

  function getOccUrlPrefix() {
    return `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}`;
  }

  function getBaseUrlPrefix() {
    return `/${Cypress.env('BASE_SITE')}/${Cypress.env(
      'BASE_LANG'
    )}/${Cypress.env('BASE_CURRENCY')}`;
  }

  function interceptAddEntry() {
    cy.intercept('POST', `${getOccUrlPrefix()}/users/*/carts/*/entries?*`).as(
      'addEntry'
    );
  }

  function interceptGetCart() {
    cy.intercept('GET', `${getOccUrlPrefix()}/users/*/carts/*?*`).as('getCart');
  }

  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    /**
     * Rapid add-to-cart clicks on the same product must produce only ONE
     * backend cart (shareReplay caching collapses concurrent createCart()
     * subscriptions).
     */
    it('should create only one cart when rapidly clicking add-to-cart multiple times', () => {
      let createCartCallCount = 0;

      cy.intercept('POST', `${getOccUrlPrefix()}/users/*/carts?*`, (req) => {
        createCartCallCount++;
        req.on('response', (res) => {
          res.setDelay(SLOW_NETWORK_DELAY_MS);
        });
        req.continue();
      }).as('createCartSlow');

      interceptAddEntry();

      cy.visit(`${getBaseUrlPrefix()}/product/${products[0].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).should(
        'be.visible'
      );

      cy.get('cx-add-to-cart cx-item-counter input').clear().type('1');

      // Three rapid clicks before any response can return.
      // force:true because the added-to-cart dialog may overlay the button.
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });

      cy.wait('@createCartSlow', { timeout: SLOW_NETWORK_DELAY_MS + 5000 });
      cy.wait(1000);

      cy.wrap(null).then(() => {
        expect(
          createCartCallCount,
          'Only one cart should be created despite multiple rapid clicks'
        ).to.equal(1);
      });

      cy.get('cx-mini-cart .count').should('contain', '3');
    });

    /**
     * Control: sequential add-to-cart with proper waits across three products
     * still works. Catches regressions where the gate logic accidentally
     * blocks normal cart updates.
     */
    it('should correctly add multiple products when waiting between add-to-cart calls', () => {
      interceptAddEntry();
      interceptGetCart();

      cy.visit(`${getBaseUrlPrefix()}/product/${products[0].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).click();
      cy.get('cx-added-to-cart-dialog', { timeout: 10000 }).should(
        'be.visible'
      );
      cy.get('.cx-dialog-total').should('contain', '1 item');
      cy.get('cx-added-to-cart-dialog [aria-label="Close Modal"]').click();
      cy.get('cx-added-to-cart-dialog').should('not.exist');

      cy.visit(`${getBaseUrlPrefix()}/product/${products[1].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).click();
      cy.get('cx-added-to-cart-dialog', { timeout: 10000 }).should(
        'be.visible'
      );
      cy.get('.cx-dialog-total').should('contain', '2 items');
      cy.get('cx-added-to-cart-dialog [aria-label="Close Modal"]').click();
      cy.get('cx-added-to-cart-dialog').should('not.exist');

      cy.visit(`${getBaseUrlPrefix()}/product/${products[2].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).click();
      cy.get('cx-added-to-cart-dialog', { timeout: 10000 }).should(
        'be.visible'
      );
      cy.get('.cx-dialog-total').should('contain', '3 items');

      cy.get('cx-added-to-cart-dialog button.btn-primary').click();

      cy.get('cx-cart-item-list .cx-item-list-row', { timeout: 15000 }).should(
        'have.length',
        3
      );

      products.forEach((product) => {
        cy.get('cx-cart-item-list').should('contain', product.name);
      });
    });

    /**
     * CXSPA-10582 — happy-path regression.
     *
     * Drives the full signed-in checkout flow without any slow intercepts and
     * verifies the gate does not break ordinary order placement: the Place
     * Order button is enabled on review, the cart-updating hint is absent,
     * order placement succeeds, and no second cart code appears in any
     * POST .../entries (no phantom cart B).
     */
    it('should complete a normal checkout with the cart-stability gate enabled', () => {
      const cartCodesSeen = new Set<string>();
      let postOrderEntryCount = 0;
      let orderPlaced = false;

      cy.intercept(
        'POST',
        `${getOccUrlPrefix()}/users/*/carts/*/entries?*`,
        (req) => {
          const match = req.url.match(/\/carts\/([^/]+)\/entries/);
          if (match) {
            cartCodesSeen.add(match[1]);
          }
          if (orderPlaced) {
            postOrderEntryCount++;
          }
          req.continue();
        }
      ).as('addEntry');

      cy.intercept('POST', `${getOccUrlPrefix()}/users/*/orders?*`, (req) => {
        req.on('response', () => {
          orderPlaced = true;
        });
        req.continue();
      }).as('placeOrder');

      checkoutFlow.registerUser();
      checkoutFlow.signInUser();
      checkoutFlow.goToCheapProductDetailsPage();
      checkoutFlow.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
      checkoutFlow.fillAddressFormWithCheapProduct();
      checkoutFlow.verifyDeliveryOptions();
      checkoutFlow.fillPaymentForm();

      // On the review page. Cart is stable (no slow intercepts) so the button
      // and hint must reflect that.
      cy.get('cx-place-order .form-check-input').check();
      cy.get('cx-place-order .cx-place-order-cart-updating').should(
        'not.exist'
      );
      cy.get('cx-place-order button.btn-primary').should('not.be.disabled');

      cy.get('cx-place-order button.btn-primary').click();
      cy.wait('@placeOrder', { timeout: 30000 });
      cy.get('cx-order-confirmation-thank-you-message', {
        timeout: 30000,
      }).should('be.visible');

      // Settle any in-flight cart writes the queue might have leaked.
      cy.wait(3000);

      cy.wrap(null).then(() => {
        expect(
          postOrderEntryCount,
          'No POST .../entries must land after the order is placed'
        ).to.equal(0);
        expect(
          cartCodesSeen.size,
          'All entry POSTs must target a single cart code (no phantom cart B)'
        ).to.equal(1);
      });

      cy.get('cx-mini-cart .count').should('contain', '0');
    });

    /**
     * CXSPA-10582 — gate observation.
     *
     * Slows the FIRST POST .../entries by enough seconds to outlast the rest
     * of the checkout prelude (address → delivery → payment → review). When
     * we land on the review page, that initial add-entry request is still
     * pending, so processesCount > 0 and ActiveCartFacade.isStable() emits
     * false. The gate must:
     *   - render the cart-updating hint,
     *   - keep the Place Order button disabled even with T&C ticked,
     *   - re-enable the button once the slow request resolves,
     * and the order must complete cleanly with no phantom-cart writes after
     * confirmation.
     *
     * The 30s delay is generous — a signed-in checkout prelude typically
     * runs in 8–15s on CI. If the prelude ever grows past that, bump the
     * delay; the test does not depend on any particular wall time, only
     * that the request is still pending when we reach review.
     */
    it('should disable Place Order while the cart is unstable and not produce a phantom cart', () => {
      const SLOW_ADD_ENTRY_MS = 30000;
      let slowEntryDelayApplied = false;
      let postOrderEntryCount = 0;
      let orderPlaced = false;
      const cartCodesSeen = new Set<string>();

      cy.intercept(
        'POST',
        `${getOccUrlPrefix()}/users/*/carts/*/entries?*`,
        (req) => {
          const match = req.url.match(/\/carts\/([^/]+)\/entries/);
          if (match) {
            cartCodesSeen.add(match[1]);
          }
          if (orderPlaced) {
            postOrderEntryCount++;
          }
          if (!slowEntryDelayApplied) {
            slowEntryDelayApplied = true;
            req.on('response', (res) => {
              res.setDelay(SLOW_ADD_ENTRY_MS);
            });
          }
          req.continue();
        }
      ).as('addEntrySlow');

      cy.intercept('POST', `${getOccUrlPrefix()}/users/*/orders?*`, (req) => {
        req.on('response', () => {
          orderPlaced = true;
        });
        req.continue();
      }).as('placeOrder');

      checkoutFlow.registerUser();
      checkoutFlow.signInUser();
      checkoutFlow.goToCheapProductDetailsPage();
      checkoutFlow.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
      checkoutFlow.fillAddressFormWithCheapProduct();
      checkoutFlow.verifyDeliveryOptions();
      checkoutFlow.fillPaymentForm();

      // Review page. The slow add-entry is still pending; the gate must
      // disable the button and render the hint even after T&C is ticked.
      cy.get('cx-place-order .form-check-input').check();
      cy.get('cx-place-order .cx-place-order-cart-updating', {
        timeout: 5000,
      }).should('exist');
      cy.get('cx-place-order button.btn-primary').should('be.disabled');

      // Wait for the slow add-entry to resolve. Cart becomes stable.
      cy.wait('@addEntrySlow', { timeout: SLOW_ADD_ENTRY_MS + 10000 });

      cy.get('cx-place-order .cx-place-order-cart-updating').should(
        'not.exist'
      );
      cy.get('cx-place-order button.btn-primary').should('not.be.disabled');

      cy.get('cx-place-order button.btn-primary').click();
      cy.wait('@placeOrder', { timeout: 30000 });
      cy.get('cx-order-confirmation-thank-you-message', {
        timeout: 30000,
      }).should('be.visible');

      // Settle any in-flight cart writes that the queue might have leaked.
      // Under the fix, none should fire.
      cy.wait(3000);

      cy.wrap(null).then(() => {
        expect(
          postOrderEntryCount,
          'No POST .../entries must land after the order is placed'
        ).to.equal(0);
        expect(
          cartCodesSeen.size,
          'All entry POSTs must target a single cart code (no phantom cart B)'
        ).to.equal(1);
      });

      cy.get('cx-mini-cart .count').should('contain', '0');
    });

    /**
     * CXSPA-10582 — multi-product rapid-add on slow 3G.
     *
     * Reproduces the user-reported manual-test scenario: as anonymous user,
     * rapid-click Add-to-cart across A, A, B, B, C with no waits between.
     * On slow 3G the original code only refreshed the cart entity once
     * processesCount fell to 0, and the per-success LoadCarts were dropped
     * by the `loadCart$` filter. Navigating to /cart mid-flight surfaced a
     * stale cart with missing line items.
     *
     * The fix has two parts:
     *   - Reducer (Part A) merges `entry` from CartAddEntrySuccess into the
     *     active cart entity so each line item appears as soon as its POST
     *     resolves.
     *   - `refreshWithoutProcesses$` (Part B) waits for processesCount to
     *     fall to 0 then dispatches a single trailing LoadCart to reconcile
     *     totals/price.
     *
     * The test slows POST .../entries by 3s so the burst genuinely overlaps,
     * then asserts that all 3 line items appear and the total quantity sums
     * to 5 (A×2 + B×2 + C×1).
     */
    it('should show all line items after rapid multi-product adds on a slow network', () => {
      cy.intercept(
        'POST',
        `${getOccUrlPrefix()}/users/*/carts/*/entries?*`,
        (req) => {
          req.on('response', (res) => {
            res.setDelay(3000);
          });
          req.continue();
        }
      ).as('addEntrySlow');

      interceptGetCart();

      // Product A — first click.
      cy.visit(`${getBaseUrlPrefix()}/product/${products[0].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).should(
        'be.visible'
      );
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('body').type('{esc}');

      // Product A — second click (re-add).
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('body').type('{esc}');

      // Product B — twice.
      cy.visit(`${getBaseUrlPrefix()}/product/${products[1].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).should(
        'be.visible'
      );
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('body').type('{esc}');
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('body').type('{esc}');

      // Product C — once.
      cy.visit(`${getBaseUrlPrefix()}/product/${products[2].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).should(
        'be.visible'
      );
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });

      // Navigate to /cart while POSTs are still pending.
      cy.visit(`${getBaseUrlPrefix()}/cart`);

      // Generous timeout: covers all 5 delayed POSTs draining + the final
      // reconcile. Three distinct line items must appear.
      cy.get('cx-cart-item-list .cx-item-list-row', { timeout: 30000 }).should(
        'have.length',
        3
      );

      products.forEach((product) => {
        cy.get('cx-cart-item-list').should('contain', product.name);
      });

      // Total quantity 5 (A×2 + B×2 + C×1).
      cy.get('cx-mini-cart .count').should('contain', '5');
    });
  });
});
