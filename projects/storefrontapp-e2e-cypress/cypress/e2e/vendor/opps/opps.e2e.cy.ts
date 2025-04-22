/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import { OppsConfig } from '@spartacus/core';

const APPAREL_BASESITE = 'apparel-uk-spa';
const APPAREL_CURRENCY = 'GBP';
const e2eLoginConfig = 'loginRequiredE2E';
const e2eHeader = 'couponcodes';
const e2eUrlParam = 'coupon-e2e';
const infoContainer = 'cx-product-intro';

const oppsProduct = {
  productID: '300515172',
  productName: 'lenus-belt-kelly-uni',
};

const oppsTester = {
  email: 'tester@opps.com',
  password: 'Password123.',
};

describe('OPPS (Omni-Channel Personalization and Promotions Services)', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', APPAREL_BASESITE);
    Cypress.env('BASE_CURRENCY', APPAREL_CURRENCY);

    cy.cxConfig({
      opps: {
        couponcodes: {
          httpHeaderName: e2eHeader,
          urlParameter: e2eUrlParam,
          localStorageKey: 'coupon-e2e-local-store',
        },
        loginRequired: {
          urlParameter: e2eLoginConfig,
        },
      },
    } as OppsConfig);
  });

  describe('OPPS Coupon Codes', () => {
    it('should fetch banner customization based on coupon code', () => {
      cy.intercept('GET', '**/cms/pages**').as('couponCodesApi');

      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/?${e2eUrlParam}=Summer100`
      );

      // Check if the route is hit
      cy.wait('@couponCodesApi', { timeout: 60000 })
        .its('request.headers')
        .should('have.property', e2eHeader, 'Summer100');
    });
  });

  describe('OPPS Login Required', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/cms/pages?pageType=ProductPage**').as(
        'productPage'
      );
    });

    it('should allow PDP if user already logged in', () => {
      cy.visit('/login');
      cy.get('cx-login-form form').should('exist');
      loginUser(oppsTester);

      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/product/${oppsProduct.productID}/${oppsProduct.productName}?${e2eLoginConfig}=true`
      );

      cy.wait('@productPage', { timeout: 60000 });
      cy.get(`${infoContainer} .code`).should('contain', oppsProduct.productID);

      signOutUser();
    });

    it('should redirect to login then show PDP after login', () => {
      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/product/${oppsProduct.productID}/${oppsProduct.productName}?${e2eLoginConfig}=true`
      );

      cy.url().should('include', '/login');
      cy.get('cx-login-form form').should('exist');
      loginUser(oppsTester);

      cy.wait('@productPage', { timeout: 60000 });
      cy.get(`${infoContainer} .code`).should('contain', oppsProduct.productID);

      signOutUser();
    });
  });

  describe('OPPS Coupon Codes & Login Together', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/cms/pages?pageType=ProductPage**').as(
        'productPage'
      );
    });

    it('should login and fetch customization', () => {
      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/product/${oppsProduct.productID}/${oppsProduct.productName}?${e2eUrlParam}=Winter200&${e2eLoginConfig}=true`
      );

      cy.url().should('include', '/login');
      cy.get('cx-login-form form').should('exist');
      loginUser(oppsTester);

      cy.wait('@productPage', { timeout: 60000 })
        .its('request.headers')
        .should('have.property', e2eHeader, 'Winter200');

      cy.get(`${infoContainer} .code`).should('contain', oppsProduct.productID);

      signOutUser();
    });
  });
});
