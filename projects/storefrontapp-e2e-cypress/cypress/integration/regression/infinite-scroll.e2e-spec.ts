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
  createDefaultQuery,
} from '../../helpers/infinite-scroll';

describe('Infinite scroll', () => {
  const testUrl = '/Open-Catalogue/Components/Power-Supplies/c/816';
  const defaultQuery = `query_relevance`;
  const defaultQueryAlias = `@${defaultQuery}`;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.server();
    createDefaultQuery();
  });

  it("should enable Infinite scroll and NOT display 'Show more' button", () => {
    configScroll(true, 0, false);
    cy.visit(testUrl);

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
      backToTopIsVisible();
    });
  });

  it("should enable infinite scroll and display 'Show more' button after 15th product", () => {
    configScroll(true, 15, false);
    cy.visit(testUrl);

    cy.wait(defaultQueryAlias).then((waitXHR) => {
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

    cy.wait(defaultQueryAlias);
    isPaginationVisible();
  });
});
