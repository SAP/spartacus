/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('SSR', () => {
  const plpUrl = '/Brands/Sony/c/brand_5';
  const pdpUrl = '/product/3965240/np-fv-70';

  before(() => {
    cy.request('/');
    cy.request(plpUrl);
    cy.request(pdpUrl);
  });

  beforeEach(() => {
    cy.intercept('GET', '**/cms/pages?*').as('cmsPage');

    cy.intercept('HEAD', '**/users/anonymous/consenttemplates*', {
      statusCode: 304,
    }).as('headConsentTemplates');
  });

  function seoChecks() {
    cy.title().should('not.be.empty');
    cy.document()
      .its('readyState', { timeout: 60000 })
      .should('eq', 'complete');
    cy.title({ timeout: 60000 }).should('not.be.empty');

    cy.get('head meta[name="robots"]', { timeout: 60000 })
      .invoke('attr', 'content')
      .should('match', /index/i)
      .and('match', /follow/i);

    cy.get('link[rel="canonical"]', { timeout: 60000 }).should(
      'have.attr',
      'href'
    );

    cy.get('script[type="application/ld+json"]', { timeout: 60000 })
      .should('have.length.greaterThan', 0)
      .each(($s) => {
        expect(($s.text() || '').trim()).to.not.equal('');
      });
  }

  it('should render homepage', () => {
    cy.visit('/');
    cy.wait('@cmsPage');

    seoChecks();

    cy.get('.header').within(() => {
      cy.get('cx-page-slot.SiteLogo').should('be.visible');
      cy.get('.searchbox').should('be.visible');
      cy.get('cx-mini-cart').should('be.visible');
    });
  });

  it('should render PLP', () => {
    cy.visit(plpUrl);
    seoChecks();
  });

  it('should render PDP', () => {
    cy.visit(pdpUrl);
    seoChecks();
  });
});
