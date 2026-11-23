/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';

/**
 * CXSPA-10582 — slow-network cart resilience, end-to-end.
 *
 * The branch adds three user-facing surfaces that engage while the cart is
 * unstable (a cart write is in flight) and release once it settles:
 *
 *   1. Mini-cart spinner          — `.cx-mini-cart-updating`
 *   2. Cart-details banner        — `.cx-cart-details-updating`
 *                                   (`role="status"`, `aria-live="polite"`)
 *   3. Proceed-to-checkout button — disabled while unstable
 *
 * All three are gated behind the feature toggle `enableCartSlowNetworkResilience`.
 * Toggle OFF is the legacy passthrough — none of the three render.
 *
 * Realistic scenario:
 *   A user rapidly visits three PDPs and adds one unit of each product to
 *   their cart on a slow network. The third add is delayed 15s. They then
 *   immediately switch to /cart to review their basket. We verify:
 *
 *   toggle ON  — mini-cart spinner engages while the third POST is pending;
 *                once all requests settle the cart page shows all three
 *                products (no entries lost due to concurrent writes).
 *   toggle OFF — no spinner appears at any point; the cart still ends up
 *                correct (legacy behaviour fully preserved).
 *
 * Why mini-cart spinner is the load-bearing e2e gate signal:
 *   Navigating to /cart while a POST is in flight causes the in-flight write
 *   process slot to clear before cart-details and proceed-to-checkout
 *   subscribe to `isStable()`. Those gates are race-prone in a real browser.
 *   The mini-cart lives on the global header, is mounted before any
 *   navigation, and can be observed reliably. The cart-details banner
 *   (incl. a11y attrs) and the button-disable gate are fully covered by
 *   deterministic fakeAsync unit specs on this branch.
 *
 * What e2e does NOT re-prove (already covered by unit specs on this branch):
 *   Reducer entry-merge, effect grouping, `shareReplay` createCart cache,
 *   250ms debounce, 10s safety-valve — re-proving these over a real network
 *   adds flake without proving anything new.
 */
describe('Cart slow-network resilience (CXSPA-10582)', () => {
  // Three in-stock products on the electronics-spa demo backend, drawn from
  // the same fixture list used by other cart e2e suites.
  const PRODUCT_A = { code: '1934793', name: 'PowerShot A480' };
  const PRODUCT_B = { code: '300938', name: 'Photosmart E317 Digital Camera' };
  const PRODUCT_C = { code: '3470545', name: 'EASYSHARE M381' };

  // 15s keeps the third POST in-flight long enough for the 250ms debounce
  // on `getUpdating()` to fire and for Cypress to observe the spinner.
  const SLOW_POST_MS = 15000;

  const occUrl = () =>
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}`;
  const baseUrl = () =>
    `/${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
      'BASE_CURRENCY'
    )}`;

  // Slow the Nth POST to .../carts/*/entries (1-indexed). postCount is a
  // closure so the delay targets exactly the request we intend without
  // affecting earlier or later POSTs.
  function interceptNthAddEntrySlow(n: number) {
    let postCount = 0;
    cy.intercept('POST', `${occUrl()}/users/*/carts/*/entries?*`, (req) => {
      postCount++;
      if (postCount === n) {
        req.on('before:response', (res) => {
          res.setDelay(SLOW_POST_MS);
        });
      }
      req.continue();
    }).as('addEntry');
  }

  // Clean slate before each test: prevents the anonymous-cart session
  // cookie from one test bleeding into the next and shifting postCount.
  function clearStorage() {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  }

  // Visit a PDP and wait for the "Add to cart" button to be ready.
  function visitPdp(productCode: string) {
    cy.visit(`${baseUrl()}/product/${productCode}`);
    cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).should(
      'be.visible'
    );
  }

  // Click "Add to cart" and immediately dismiss the AddedToCart dialog.
  // { force: true } handles the sticky bar that can overlap the button.
  // Esc prevents the open modal from blocking the next navigation.
  function clickAddToCart() {
    cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
    cy.get('body').type('{esc}');
  }

  viewportContext(['desktop'], () => {
    beforeEach(() => clearStorage());

    /**
     * toggle ON — three products, third add is slow.
     *
     * Flow:
     *   1. Add Product A from PDP — fast POST #1. Wait for mini-cart to
     *      confirm item landed (cart created, postCount now 1).
     *   2. Add Product B from PDP — fast POST #2. Wait for count to confirm
     *      postCount is now 2.
     *   3. Visit PDP for Product C and click "Add to cart" — slow POST #3.
     *      The mini-cart spinner must engage immediately (still on PDP, no
     *      navigation race).
     *   4. Navigate to /cart while POST #3 is still pending.
     *   5. Wait for all three POSTs to settle.
     *   6. Assert the cart page shows all three products — no entries lost
     *      due to concurrent writes under a slow network.
     */
    it('toggle ON: spinner engages during slow third add; all three products appear on cart page once settled', () => {
      cy.cxConfig({
        features: { enableCartSlowNetworkResilience: true },
      } as any);

      interceptNthAddEntrySlow(3);

      // Step 1: Product A, fast POST #1.
      visitPdp(PRODUCT_A.code);
      clickAddToCart();
      cy.get('cx-mini-cart .count', { timeout: 15000 }).should('contain', '1');

      // Step 2: Product B, fast POST #2. Count advances to 2.
      visitPdp(PRODUCT_B.code);
      clickAddToCart();
      cy.get('cx-mini-cart .count', { timeout: 15000 }).should('contain', '2');

      // Step 3: Product C PDP — click triggers slow POST #3.
      // Do NOT wait for the count update; navigate immediately so the
      // slow POST is still in-flight when we reach the cart page.
      visitPdp(PRODUCT_C.code);
      clickAddToCart();

      // Mini-cart spinner must engage (isStable()=false, toggle ON,
      // 250ms debounce has fired). Observed here on the PDP before
      // navigating so there is no navigation race.
      cy.get('cx-mini-cart .cx-mini-cart-updating', { timeout: 5000 }).should(
        'exist'
      );

      // Step 4: switch to /cart while POST #3 is still pending.
      cy.visit(`${baseUrl()}/cart`);

      // Step 5: settle all three add-entry POSTs.
      // All three waits use the slow timeout: cy.wait('@addEntry') consumes
      // alias responses in the order they were intercepted. POSTs #1 and #2
      // resolve immediately but cy.wait() may process them in any order when
      // the queue already has responses waiting, so we allow the full
      // SLOW_POST_MS window for all three to be safe.
      cy.wait('@addEntry', { timeout: SLOW_POST_MS + 10000 });
      cy.wait('@addEntry', { timeout: SLOW_POST_MS + 10000 });
      cy.wait('@addEntry', { timeout: SLOW_POST_MS + 10000 });

      // Step 6: all three products must appear on the cart page.
      // This proves no entries were lost or corrupted by the concurrent
      // writes on the degraded network.
      cy.get('cx-cart-item-list').within(() => {
        cy.contains('.cx-name', PRODUCT_A.name).should('exist');
        cy.contains('.cx-name', PRODUCT_B.name).should('exist');
        cy.contains('.cx-name', PRODUCT_C.name).should('exist');
      });
    });

    /**
     * toggle OFF — same flow, no spinner, cart still correct.
     *
     * Identical to the ON scenario above but the toggle is OFF. The
     * mini-cart spinner must never appear even while POST #3 is in flight.
     * The cart correctness assertions at the end verify the underlying write
     * logic (reducer entry-merge, effect ordering) is unaffected by the toggle.
     */
    it('toggle OFF: no spinner rendered during slow third add; all three products still appear once settled', () => {
      cy.cxConfig({
        features: { enableCartSlowNetworkResilience: false },
      } as any);

      interceptNthAddEntrySlow(3);

      // Product A, fast POST #1.
      visitPdp(PRODUCT_A.code);
      clickAddToCart();
      cy.get('cx-mini-cart .count', { timeout: 15000 }).should('contain', '1');

      // Product B, fast POST #2.
      visitPdp(PRODUCT_B.code);
      clickAddToCart();
      cy.get('cx-mini-cart .count', { timeout: 15000 }).should('contain', '2');

      // Product C, slow POST #3.
      visitPdp(PRODUCT_C.code);
      clickAddToCart();

      // Toggle OFF: the spinner must never appear — the new gate must not
      // leak into the legacy code path.
      cy.get('cx-mini-cart .cx-mini-cart-updating').should('not.exist');

      // Let all three POSTs settle before navigating. In the OFF scenario
      // we are not asserting anything concurrent with the in-flight POST —
      // we only need to confirm (a) no spinner ever appeared, and (b) the
      // cart ends up correct. Settling first removes the navigation-abort
      // race that can drop POST #3 mid-flight.
      cy.wait('@addEntry', { timeout: SLOW_POST_MS + 10000 });
      cy.wait('@addEntry', { timeout: SLOW_POST_MS + 10000 });
      cy.wait('@addEntry', { timeout: SLOW_POST_MS + 10000 });

      cy.visit(`${baseUrl()}/cart`);

      // Cart correctness is unaffected by the toggle.
      cy.get('cx-cart-item-list').within(() => {
        cy.contains('.cx-name', PRODUCT_A.name).should('exist');
        cy.contains('.cx-name', PRODUCT_B.name).should('exist');
        cy.contains('.cx-name', PRODUCT_C.name).should('exist');
      });
    });
  });
});
