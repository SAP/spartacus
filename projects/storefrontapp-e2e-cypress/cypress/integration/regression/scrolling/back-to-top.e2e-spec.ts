import {
  acceptPrivaryTerm,
  addToCartFromList,
  clickCartIcon,
  verifyBackToTopButtonIsNotVisible,
  verifyBackToTopButtonIsVisible,
  scrollToBottomOfPage,
  verifyBackToTopButtonTakesPageToTop,
  visitHomePage,
  interceptSpecificPage,
  clickSpecficComponentOfPage,
  PRODUCT_DETAILS_HEADER,
  BACK_TO_TOP_BUTTON,
  SONY_CAMERA_URL_PATH,
  POWER_SUPPLY_LIST_PAGE,
} from '../../../helpers/infinite-scroll';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Back to the Top', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      clearAllStorage();
    });

    describe('Scroll to Top', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
      });

      beforeEach(() => {
        clearAllStorage();
        cy.clearCookies();
      });

      it('back to top button should work on homepage (CXSPA-2407)', () => {
        visitHomePage();
        acceptPrivaryTerm();
        verifyBackToTopButtonIsNotVisible();
        scrollToBottomOfPage();
        verifyBackToTopButtonIsVisible();
        clickSpecficComponentOfPage(BACK_TO_TOP_BUTTON);
        verifyBackToTopButtonTakesPageToTop();
      });

      it('back to top button should work on product list page (CXSPA-2407)', () => {
        interceptSpecificPage(POWER_SUPPLY_LIST_PAGE);
        acceptPrivaryTerm();
        verifyBackToTopButtonIsNotVisible();
        scrollToBottomOfPage();
        verifyBackToTopButtonIsVisible();
        clickSpecficComponentOfPage(BACK_TO_TOP_BUTTON);
        verifyBackToTopButtonTakesPageToTop();
      });

      it('back to top button should work when page is scrolled dynamically (CXSPA-2407)', () => {
        interceptSpecificPage(SONY_CAMERA_URL_PATH);
        acceptPrivaryTerm();
        verifyBackToTopButtonIsNotVisible();
        //Clicking Product Detail header scrolls the page to bring the component into view
        clickSpecficComponentOfPage(PRODUCT_DETAILS_HEADER);
        verifyBackToTopButtonIsVisible();
        clickSpecficComponentOfPage(BACK_TO_TOP_BUTTON);
        verifyBackToTopButtonTakesPageToTop();
      });

      it('back to top should work on Cart page with items (CXSPA-2407)', () => {
        interceptSpecificPage(POWER_SUPPLY_LIST_PAGE);
        acceptPrivaryTerm();
        addToCartFromList(6);
        clickCartIcon();
        verifyBackToTopButtonIsNotVisible();
        scrollToBottomOfPage();
        verifyBackToTopButtonIsVisible();
        clickSpecficComponentOfPage(BACK_TO_TOP_BUTTON);
        verifyBackToTopButtonTakesPageToTop();
      });
    });
  });
});
