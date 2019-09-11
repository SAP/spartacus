import * as infiniteScroll from '../../helpers/infinite-scroll';

context('Infinite scroll', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('infinite scroll is active', () => {
    before(() => {
      infiniteScroll.scrollConfig(true, 0, false);
    });

    beforeEach(() => {
      infiniteScroll.verifyProductListLoaded();
    });

    it('should be active', () => {
      cy.get('cx-pagination .pagination').should('not.exist');

      infiniteScroll.backtoTopIsNotVisible();
      infiniteScroll.scrollToFooter();
      infiniteScroll.backToTopIsVisisble();
    });

    describe('infinite scroll should be active, product limist is 15 and show more button is false', () => {});

    describe('infinite scroll should be active, product limist is 0 and show more button is true', () => {});
  });

  describe('infinite scroll is not active', () => {
    beforeEach(() => {
      infiniteScroll.scrollConfig(false, 0, false);
      infiniteScroll.verifyProductListLoaded();
    });

    it('should not be active', () => {
      cy.get('cx-pagination .pagination').should('exist');
    });
  });
});
