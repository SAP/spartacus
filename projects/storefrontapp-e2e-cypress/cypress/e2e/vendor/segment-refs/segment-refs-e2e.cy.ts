/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { interceptGet } from '../../../support/utils/intercept';
import { cmsEndpoints } from '../../../helpers/cms-endpoints';

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'EUR';
describe('Segment Reference', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.expose('BASE_SITE', APPAREL_BASESITE);
    Cypress.expose('BASE_CURRENCY', APPAREL_CURRENCY);
  });
  it('should fetch appropriate banner customization', () => {
    interceptGet('segmentRefApi', `${cmsEndpoints.pages}*`);
    cy.visit(
      `${Cypress.expose('BASE_SITE')}/${Cypress.expose('BASE_LANG')}/${Cypress.expose(
        'BASE_CURRENCY'
      )}/?segmentrefs=footwear`
    );
    cy.wait('@segmentRefApi').then((xhr) => {
      expect(xhr.request.headers).to.have.property('segmentrefs', 'footwear');
    });
  });
});
