import * as infiniteScroll from '../../helpers/infinite-scroll';

context('Infinite scroll', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    infiniteScroll.scrollConfig(true, 0, false);
    infiniteScroll.verifyProductListLoaded();
  });

  describe('infinite scroll is active', () => {
    it('should be active', () => {
      infiniteScroll.scrollToFooter();

      cy.get('.cx-sorting.bottom').should('not.exist');
    });

    describe('infinite scroll should be active, product limist is 15 and show more button is false', () => {});

    describe('infinite scroll should be active, product limist is 0 and show more button is true', () => {});
  });

  describe('infinite scroll is not active', () => {
    beforeEach(() => {
      infiniteScroll.scrollConfig(false, 0, false);
    });

    it('should not be active', () => {
      infiniteScroll.scrollToFooter();

      cy.get('.cx-sorting.bottom').should('exist');
    });
  });
});
