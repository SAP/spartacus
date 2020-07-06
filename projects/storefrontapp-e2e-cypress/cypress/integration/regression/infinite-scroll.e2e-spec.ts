import {
  configScroll,
  isPaginationNotVisible,
  backtoTopIsNotVisible,
  scrollToFooter,
  backToTopIsVisible,
  isPaginationVisible,
  verifySortingResetsList,
  verifyFilterResetsList,
  verifyGridResetsList,
} from '../../helpers/infinite-scroll';
import {
  createAllProductQuery,
  QUERY_ALIAS,
} from '../../helpers/product-search';

describe('Infinite scroll', () => {
  const testUrl = '/Open-Catalogue/Components/Power-Supplies/c/816';
  const productQueryAlias = `@${QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED}`;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.server();
    createAllProductQuery(QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED);
  });

  it("should enable Infinite scroll and NOT display 'Show more' button", () => {
    configScroll(true, 0, false);
    cy.visit(testUrl);

    cy.wait(productQueryAlias).then((waitXHR) => {
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

  it("Should enable infinite scroll and display 'Show more' button", () => {
    configScroll(true, 0, true);
    cy.visit(testUrl);

    cy.wait(productQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;

      isPaginationNotVisible();
      scrollToFooter(totalResults, true);
      backToTopIsVisible();
    });
  });

  it("should enable infinite scroll and display 'Show more' button after 15th product", () => {
    configScroll(true, 15, false);
    cy.visit(testUrl);

    cy.wait(productQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;
      isPaginationNotVisible();

      backtoTopIsNotVisible();
      scrollToFooter(totalResults, false, 15);
      backToTopIsVisible(true);
    });
  });

  it('Should not display Infinite scroll', () => {
    configScroll(false, 0, false);
    cy.visit(testUrl);

    cy.wait(productQueryAlias);
    isPaginationVisible();
  });
});
