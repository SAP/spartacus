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

  infiniteScroll.testInfiniteScrollAvoidDisplayShowMoreButton();
});
