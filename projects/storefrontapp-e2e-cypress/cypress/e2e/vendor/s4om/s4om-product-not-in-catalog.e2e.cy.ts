/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../sample-data/b2b-checkout';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';
import {
  s4omB2bProductNotInCatalogUser,
  s4omProductNotInCatalogOrderIds,
} from '../../../helpers/vendor/s4om/s4om';
import { agentLoginForJDK21 } from '../../../helpers/auth-forms';

describe(
  'S4HANA Order management - product not in catalog',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
      Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
      Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
      Cypress.env('JDK_VERSION', 'JDK21');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    describe('Order Details Page - products not in the catalog (CXIEP-8801/CXSPA-10774)', () => {
      it('should be able to login as a b2b user', () => {
        cy.visit('/login');
        agentLoginForJDK21(
          s4omB2bProductNotInCatalogUser.registrationData.email,
          s4omB2bProductNotInCatalogUser.registrationData.password
        );
      });

      describe('All product in catalog', () => {
        it('should visit order details page', () => {
          cy.visit(
            `${POWERTOOLS_BASESITE}/en/USD/my-account/order/${s4omProductNotInCatalogOrderIds.ALL_PRODUCT_IN_CATALOG}`
          );
        });

        it('should all pdp hyperlinks be active', () => {
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tr a.cx-link'
          ).should('have.length', 1);
        });

        it("should all 'Buy it Again' buttons be active", () => {
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tbody tr cx-add-to-cart button'
          )
            .should('have.length', 1)
            .each(($btn) => {
              cy.wrap($btn)
                .should('be.visible')
                .and('not.be.disabled')
                .invoke('text')
                .then((text) => {
                  expect(text.trim()).to.eq('Buy It Again');
                });
            });
        });

        it("should button 'Reorder' be active", () => {
          cy.get('cx-order-details-reorder button')
            .should('exist')
            .and('not.be.disabled');
        });
      });

      describe('Some product in catalog', () => {
        it('should visit order details page', () => {
          cy.visit(
            `${POWERTOOLS_BASESITE}/en/USD/my-account/order/${s4omProductNotInCatalogOrderIds.SOME_PRODUCT_IN_CATALOG}`
          );
        });

        it('should some pdp hyperlinks be active', () => {
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tbody tr'
          ).should('have.length', 3);
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tbody tr a.cx-link'
          ).should('have.length', 2);
        });

        it("should some 'Buy it Again' buttons be active", () => {
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tr cx-add-to-cart button:visible:not(:disabled)'
          )
            .should('have.length', 2)
            .each(($btn) => {
              cy.wrap($btn)
                .invoke('text')
                .then((text) => {
                  expect(text.trim()).to.eq('Buy It Again');
                });
            });
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tr cx-add-to-cart button:visible:disabled'
          )
            .should('have.length', 1)
            .each(($btn) => {
              cy.wrap($btn)
                .invoke('text')
                .then((text) => {
                  expect(text.trim()).to.eq('Not Orderable');
                });
            });
        });

        it("should button 'Reorder' be active", () => {
          cy.get('cx-order-details-reorder button')
            .should('exist')
            .and('not.be.disabled');
        });
      });

      describe('None product in catalog', () => {
        it('should visit order details page', () => {
          cy.visit(
            `${POWERTOOLS_BASESITE}/en/USD/my-account/order/${s4omProductNotInCatalogOrderIds.NONE_PRODUCT_IN_CATALOG}`
          );
        });

        it('should no pdp hyperlinks be active', () => {
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tbody tr'
          ).should('have.length', 1);
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tbody tr a.cx-link'
          ).should('have.length', 0);
        });

        it("should no 'Buy it Again' button be active", () => {
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tr cx-add-to-cart button:visible:not(:disabled)'
          ).should('have.length', 0);
          cy.get(
            'cx-order-consigned-entries cx-cart-item-list tr cx-add-to-cart button:visible:disabled'
          )
            .should('have.length', 1)
            .each(($btn) => {
              cy.wrap($btn)
                .invoke('text')
                .then((text) => {
                  expect(text.trim()).to.eq('Not Orderable');
                });
            });
        });

        it("should button 'Reorder' be disabled", () => {
          cy.get('cx-order-details-reorder button')
            .should('exist')
            .and('be.disabled');
        });
      });
    });
  }
);
