/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  });
  it('should fetch appropriate banner customization', () => {
    interceptGet('segmentRefApi', '/cms/pages*');
    cy.visit(
      `${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
        'BASE_CURRENCY'
      )}/?segmentrefs=footwear`
    );
    cy.wait('@segmentRefApi').then((xhr) => {
      expect(xhr.request.headers).to.have.property('segmentrefs', 'footwear');
    });
  });
});
