/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'EUR';
export const APPAREL_LANG = 'en';

describe('Segment Reference', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', APPAREL_BASESITE);
    Cypress.env('BASE_CURRENCY', APPAREL_CURRENCY);
    Cypress.env('BASE_LANG', APPAREL_LANG); // <<<< YOU NEED THIS!

    cy.intercept('GET', '**/cms/pages**').as('segmentRefApi');
  });

  it('should fetch appropriate banner customization', () => {
    cy.visit(
      `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env('BASE_CURRENCY')}/?segmentrefs=footwear`
    );

    cy.wait('@segmentRefApi', { timeout: 360000 }).then((xhr) => {
      expect(xhr.request.url).to.include('segmentrefs=footwear');
      expect(xhr.response.statusCode).to.eq(200);
    });
  });
});


