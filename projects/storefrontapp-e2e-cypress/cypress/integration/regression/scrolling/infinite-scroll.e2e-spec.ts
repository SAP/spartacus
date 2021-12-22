import {
  backToTopIsVisible,
  configScroll,
  isPaginationNotVisible,
  isPaginationVisible,
  scrollToFooter,
} from '../../../helpers/infinite-scroll';
import { searchUrlPrefix } from '../../../helpers/product-search';
import * as infiniteScroll from '../../../helpers/infinite-scroll';

describe('Infinite scroll', () => {
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
    }).as(infiniteScroll.defaultQuery);
  });

  it("should enable infinite scroll and display 'Show more' button", () => {
    configScroll(true, 0, true);
    cy.visit(infiniteScroll.testUrl);

    cy.wait(infiniteScroll.defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;

      isPaginationNotVisible();
      scrollToFooter(totalResults, true);
      backToTopIsVisible(true);
    });
  });

  it("should enable infinite scroll and display 'Show more' button after 12th product", () => {
    configScroll(true, 12, false);
    cy.visit(infiniteScroll.testUrl);

    cy.wait(infiniteScroll.defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;
      isPaginationNotVisible();
      backToTopIsVisible();
      scrollToFooter(totalResults, true, 12);
      backToTopIsVisible(true);
    });
  });

  it('should not display Infinite scroll', () => {
    configScroll(false, 0, false);
    cy.visit(infiniteScroll.testUrl);

    cy.wait(infiniteScroll.defaultQueryAlias);
    isPaginationVisible();
  });
});
