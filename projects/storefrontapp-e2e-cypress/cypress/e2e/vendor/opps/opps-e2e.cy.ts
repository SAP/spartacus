/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import { interceptGet } from '../../../support/utils/intercept';
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
    it('should fetch appropriate banner customization based on coupon codes', () => {
      interceptGet('couponCodesApi', '/cms/pages*');
      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/?${e2eUrlParam}=Summer100`
      );
      cy.wait('@couponCodesApi').then((xhr) => {
        expect(xhr.request.headers).to.have.property(e2eHeader, 'Summer100');
      });
    });
  });

  describe('OPPS Login Required', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/cms/pages?pageType=ProductPage**`,
      }).as('productPage');
    });
    it('should continue to PDP if user is already logged in', () => {
      cy.visit('/login');
      loginUser(oppsTester);
      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/product/${oppsProduct.productID}/${
          oppsProduct.productName
        }?${e2eLoginConfig}=true`
      );
      cy.wait(`@productPage`);
      cy.get(`${infoContainer} .code`).should('contain', oppsProduct.productID);
      signOutUser();
    });
    it('should redirect to login page if user is not logged in, and once user logs in, show PDP', () => {
      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/product/${oppsProduct.productID}/${
          oppsProduct.productName
        }?${e2eLoginConfig}=true`
      );
      cy.url().should('contain', 'login');
      loginUser(oppsTester);
      cy.wait(`@productPage`);
      cy.get(`${infoContainer} .code`).should('contain', oppsProduct.productID);
      signOutUser();
    });
  });

  describe('OPPS Coupon Codes & Login Required Together', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/cms/pages?pageType=ProductPage**`,
      }).as('productPage');
    });
    it('should fetch appropriate banner customization based on coupon codes & show login page if user is not logged in', () => {
      cy.visit(
        `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
          'BASE_CURRENCY'
        )}/product/${oppsProduct.productID}/${
          oppsProduct.productName
        }?${e2eUrlParam}=Winter200&${e2eLoginConfig}=true&test=12`
      );
      cy.url().should('contain', 'login');
      loginUser(oppsTester);
      cy.wait(`@productPage`).then((xhr) => {
        expect(xhr.request.headers).to.have.property(e2eHeader, 'Winter200');
      });
      cy.get(`${infoContainer} .code`).should('contain', oppsProduct.productID);
      signOutUser();
    });
  });
});
