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
        cy.get('cx-pagination a.end[aria-label="last page"]').first().click();
      },
    },
    // TODO: CURRENT PAGE IS DIFFERENT FOR SEARCH TYPES
    {
      case: CASE_TITLES[key] + ' (last page)',
      url: CASE_URLS[key] + '?currentPage=14',
      navigateToNext: () => {
        cy.get('cx-pagination a.start[aria-label="first page"]')
          .first()
          .click();
      },
    },
    // TODO: FAILS RELOAD TEST BECAUSE CACHED PAGE IS RETURNED
    // ?? Use skip wait intercept ??
    {
      case: CASE_TITLES[key] + ' (back to first page)',
      url: CASE_URLS[key],
      navigateToNext: () => {
        cy.get('cx-sorting .ng-select').first().ngSelect('Top Rated');
      },
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
        cy.get('cx-pagination a.end[aria-label="last page"]').first().click();
      },
    },
    {
      case: CASE_TITLES[key] + ' (last page with sort)',
      url: CASE_URLS[key] + '?sortCode=topRated&currentPage=14',
      navigateToNext: () => {
        // clickFacet('Chiba')
      },
    },
    // TODO: QUERY URLS DIFFER FOR CASES
    {
      case: CASE_TITLES[key] + ' (with query and sort)',
      url:
        CASE_URLS[key] +
        '?query=:topRated:allCategories:brands:availableInStores:Chiba',
    },
    {
      case: CASE_TITLES[key] + ' (2nd page with query and sort)',
      url:
        CASE_URLS[key] +
        '?query=:topRated:allCategories:brands:availableInStores:Chiba&currentPage=1',
    },
    {
      case: CASE_TITLES[key] + ' (last page with query and sort)',
      url:
        CASE_URLS[key] +
        '?query=:topRated:allCategories:brands:availableInStores:Chiba&currentPage=2',
    },
    // TODO: CASE WHERE THERE IS TWO SORT CODES AND A SORT CODE CHANGE DOES NOT WORK!!!
    {
      case:
        CASE_TITLES[key] + ' (last page with query changing sort to default)',
      url:
        CASE_URLS[key] +
        '?query=:topRated:allCategories:brands:availableInStores:Chiba&currentPage=2&sortCode=relevance',
    },
  ];
}

export const SSR_E2E_PLP_SCENARIOS = [
  ...getStandardCases('ALL_BRANDS'),
  ...getStandardCases('QUERY_GRIP'),
  ...getStandardCases('DIGITAL_CAMERAS'),
];
