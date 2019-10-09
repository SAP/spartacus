import {
  infiniteScrollNoShowMoreTest,
  infiniteScrollNotActivatedTest,
  infiniteScrollWithShowMoreAtALimit,
  infiniteScrollWithShowMoreAtTheBeginningTest,
  scrollConfig,
  verifyProductListLoaded,
} from '../../helpers/infinite-scroll';

context('Infinite scroll', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('infinite scroll is active and no show more button', () => {
    beforeEach(() => {
      scrollConfig(true, 0, false);
      verifyProductListLoaded();
    });

    infiniteScrollNoShowMoreTest();
  });

  describe('infinite scroll should be active using the show more button from the beginning', () => {
    beforeEach(() => {
      scrollConfig(true, 0, true);
      verifyProductListLoaded();
    });

    infiniteScrollWithShowMoreAtTheBeginningTest();
  });

  describe('infinite scroll should be active using the show more button starting from the 15th and more products', () => {
    beforeEach(() => {
      scrollConfig(true, 15, false);
      verifyProductListLoaded();
    });

    infiniteScrollWithShowMoreAtALimit();
  });

  describe('infinite scroll is not active when not using the view config', () => {
    beforeEach(() => {
      scrollConfig(false, 0, false);
      verifyProductListLoaded();
    });

    infiniteScrollNotActivatedTest();
  });
});
