/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTestsBefore } from '../../../support/utils/test-isolation';

/**
 * This test checks accessibility concerns on the PDP page using Access Continuum
 */
describe('Product Details Page Accessibility', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.a11yContinuumSetup();
    cy.visit(`/product/1382080`);
  });

  it('PDP with Product Details', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(1)').click();
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-details-tab .container'
    );
    cy.get('main').a11yRunContinuumTest();
  });

  it('PDP with Reviews', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(3)').click();
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-reviews .container .review'
    );
    cy.get('cx-page-slot[position="Tabs"] cx-tab').a11yRunContinuumTest();
  });

  it('PDP write a Review Form', () => {
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-reviews .container .header button.btn-primary'
    ).click();
    cy.get(
      'cx-page-slot[position="Tabs"] cx-tab cx-product-reviews .container form button[type="submit"]'
    ).click();
    cy.get('cx-page-slot[position="Tabs"] cx-tab').a11yRunContinuumTest();
  });

  it('PDP with Spec', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(2)').click();
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-attributes .container'
    );
    cy.get('cx-page-slot[position="Tabs"] cx-tab').a11yRunContinuumTest();
  });

  it('PDP with Shipping', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(4)').click();
    cy.get('cx-tab-panel [role="tabpanel"].active cx-paragraph');
    cy.get('cx-page-slot[position="Tabs"] cx-tab').a11yRunContinuumTest();
  });

  it('PDP image zoom', () => {
    cy.get('cx-product-image-zoom-trigger').click();
    cy.get(
      'cx-product-image-zoom-dialog .modal-body cx-product-image-zoom-view button.cx-zoom-btn'
    );
    cy.get('cx-product-image-zoom-dialog').a11yRunContinuumTest();
  });
});
