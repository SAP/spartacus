/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { interceptGet } from '../../../support/utils/intercept';

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'EUR';

describe('Segment Reference', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', APPAREL_BASESITE);
    Cypress.env('BASE_CURRENCY', APPAREL_CURRENCY);

    interceptGet('segmentRefApi', '**/cms/pages**');
  });

  it('should fetch appropriate banner customization', () => {
    cy.visit(
      `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
        'BASE_CURRENCY'
      )}/?segmentrefs=footwear`
    );
    cy.wait('@segmentRefApi', { timeout: 160000 }).then((xhr) => {
      expect(xhr.request.headers).to.have.property('segmentrefs', 'footwear');
      expect(xhr.response.statusCode).to.eq(200); // Extra verification
    });
  });
});

