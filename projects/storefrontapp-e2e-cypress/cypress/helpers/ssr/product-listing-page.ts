/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const CASE_TITLES = {
  ALL_BRANDS: 'All Brands',
  QUERY_GRIP: 'Search Query "grip"',
  DIGITAL_CAMERAS: 'Digital Cameras',
};

const CASE_URLS = {
  ALL_BRANDS: '/Brands/all/c/brands',
  QUERY_GRIP: '/search/grip',
  DIGITAL_CAMERAS: '/Open-Catalogue/Cameras/Digital-Cameras/c/575',
};

const CASE_QUERY_PARTS = {
  ALL_BRANDS: '?query=:topRated:allCategories:brands',
  QUERY_GRIP: '?query=grip:topRated',
  DIGITAL_CAMERAS: '?query=:topRated:allCategories:575',
};

function getStandardCases(key: string) {
  return [
    {
      case: CASE_TITLES[key],
      url: CASE_URLS[key],
      navigateToNext: () => {
        cy.get('cx-pagination a.page[aria-label="page 2"]').first().click();
      },
    },
    {
      case: CASE_TITLES[key] + ' (2nd page)',
      url: CASE_URLS[key] + '?currentPage=1',
      navigateToNext: () => {
        cy.get('cx-pagination a.start[aria-label="first page"]')
          .first()
          .click();
      },
    },
    {
      case: CASE_TITLES[key] + ' (back to first page)',
      url: CASE_URLS[key],
      navigateToNext: () => {
        cy.get('cx-sorting .ng-select').first().ngSelect('Top Rated');
      },
      skipReloadTest: true,
    },
    {
      case: CASE_TITLES[key] + ' (with sort)',
      url: CASE_URLS[key] + '?sortCode=topRated',
      navigateToNext: () => {
        cy.get('cx-pagination a.page[aria-label="page 2"]').first().click();
      },
    },
    {
      case: CASE_TITLES[key] + ' (2nd page with sort)',
      url: CASE_URLS[key] + '?sortCode=topRated&currentPage=1',
      navigateToNext: () => {
        cy.get('cx-facet a').contains('Chiba').click();
      },
    },
    {
      case: CASE_TITLES[key] + ' (with query and sort)',
      url: CASE_URLS[key] + CASE_QUERY_PARTS[key] + ':availableInStores:Chiba',
      navigateToNext: () => {
        cy.get('cx-pagination a.page[aria-label="page 2"]').first().click();
      },
    },
    {
      case: CASE_TITLES[key] + ' (2nd page with query and sort)',
      url:
        CASE_URLS[key] +
        CASE_QUERY_PARTS[key] +
        ':availableInStores:Chiba&currentPage=1',
      navigateToNext: () => {
        cy.get('cx-sorting .ng-select').first().ngSelect('Relevance');
      },
    },
    {
      case: CASE_TITLES[key] + ' (with query changing sort to default)',
      url:
        CASE_URLS[key] +
        CASE_QUERY_PARTS[key] +
        ':availableInStores:Chiba&currentPage=1&sortCode=relevance',
    },
  ];
}

export const SSR_E2E_PLP_SCENARIOS = [
  ...getStandardCases('ALL_BRANDS'),
  ...getStandardCases('QUERY_GRIP'),
  ...getStandardCases('DIGITAL_CAMERAS'),
];
