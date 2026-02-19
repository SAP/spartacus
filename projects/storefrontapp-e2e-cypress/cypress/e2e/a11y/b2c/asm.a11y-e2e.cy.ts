/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { agentLoginForJDK21 } from '../../../helpers/auth-forms';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('ASM Continuum tests', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.a11yContinuumSetup();
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/?asm=true');
  });

  it('Main body', () => {
    cy.get('cx-asm-main-ui').a11yRunContinuumTest();
  });

  it('Logged in', () => {
    cy.whenJDK21(() => {
      cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
      agentLoginForJDK21('brandon.leclair@acme.com', 'pw4all');
    });

    cy.whenJDK17(() => {
      cy.get('input').first().type('brandon.leclair@acme.com');
      cy.get('input[type="password"').type('pw4all{enter}');
    });

    cy.get('.searchLabel').should('be.visible');
    cy.get('cx-asm-main-ui').a11yRunContinuumTest();
  });

  it('Customers - modal', () => {
    cy.get('.cx-asm-customer-list-link').click();
    cy.get('.customer-list-selector').click();
    cy.get('.ng-option').eq(1).click();
    cy.get('.cx-avatar-text');
    cy.get('.cx-asm-dialog').a11yRunContinuumTest();
  });

  it('Create new customer - modal', () => {
    cy.get('.cx-asm-create-customer-btn').click();
    cy.get('.cx-asm-dialog input');
    cy.get('.cx-asm-dialog').a11yRunContinuumTest();
    cy.get('.cx-asm-create-customer-btn-cancel').click();
  });

  it('Session started', () => {
    cy.get('input').first().type('test-user-with-orders@sap.cx.com');
    cy.get('.asm-results button').eq(1).click();
    cy.get('button').contains(' Start Session ').click();
    cy.get('.cx-asm-assignCart-input-show-no-button');
    cy.get('cx-customer-emulation').a11yRunContinuumTest();
  });

  context('Customer 360', () => {
    it('Modal body', () => {
      cy.get('.cx-360-button').click();
      cy.get('cx-asm-customer-360-product-listing');
      cy.get('.cx-modal-content').a11yRunContinuumTest();
    });

    it('Tabs', () => {
      const tabsContentsSelector =
        'cx-asm-customer-360-product-listing, cx-asm-customer-360-profile, cx-asm-customer-360-activity, cx-asm-customer-360-support-tickets, cx-asm-customer-360-promotion-listing, .store-details';

      cy.get('button[role="tab"]').each((tab) => {
        cy.wrap(tab).click();
        cy.get(tabsContentsSelector);
        cy.get('.cx-tab-content').a11yRunContinuumTest();
      });
    });
  });
});
