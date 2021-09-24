import {
  backtoTopIsNotVisible,
  backToTopIsVisible,
  configScroll,
  isPaginationNotVisible,
  isPaginationVisible,
  scrollToFooter,
  verifyFilterResetsList,
  verifyGridResetsList,
  verifySortingResetsList,
} from '../../helpers/infinite-scroll';
import { searchUrlPrefix } from '../../helpers/product-search';

describe('Infinite scroll', () => {
  const testUrl = '/Open-Catalogue/Components/Power-Supplies/c/816';
  const defaultQuery = `query_relevance`;
  const defaultQueryAlias = `@${defaultQuery}`;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      query: {
        fields: '*',
        query: ':relevance:allCategories:816',
      },
      pathname: searchUrlPrefix,
    }).as(defaultQuery);
  });

  it("should enable Infinite scroll and NOT display 'Show more' button", () => {
    configScroll(true, 0, false);
    cy.visit(testUrl);

    cy.intercept({
      method: 'GET',
      pathname: searchUrlPrefix,
      query: {
        fields: '*',
        query: ':topRated:allCategories:816:brand:brand_5',
      },
    }).as('gridQuery');

    cy.intercept({
      method: 'GET',
      pathname: searchUrlPrefix,
      query: {
        query: ':relevance:allCategories:816',
        sort: 'topRated',
        fields: '*',
      },
    }).as('sortQuery');

    cy.wait(defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;
      isPaginationNotVisible();

      backtoTopIsNotVisible();
      scrollToFooter(totalResults);
      backToTopIsVisible();

      verifySortingResetsList();

      verifyFilterResetsList();

      verifyGridResetsList();
    });
  });

  it("should enable infinite scroll and display 'Show more' button", () => {
    configScroll(true, 0, true);
    cy.visit(testUrl);

    cy.wait(defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;

      isPaginationNotVisible();
      scrollToFooter(totalResults, true);
      backToTopIsVisible(true);
    });
  });

  it("should enable infinite scroll and display 'Show more' button after 12th product", () => {
    configScroll(true, 12, false);
    cy.visit(testUrl);

    cy.wait(defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;
      isPaginationNotVisible();
      backToTopIsVisible();
      scrollToFooter(totalResults, true, 12);
      backToTopIsVisible(true);
    });
  });

  it('should not display Infinite scroll', () => {
    configScroll(false, 0, false);
    cy.visit(testUrl);

    cy.wait(defaultQueryAlias);
    isPaginationVisible();
  });
});
