import {
  acceptPrivaryTerm,
  addToCartFromList,
  clickCartIcon,
  scrollToBottomOfPageAndClickBackToTopButton
} from '../../../helpers/infinite-scroll';
import * as infiniteScroll from '../../../helpers/infinite-scroll';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { waitForPage } from '../../../helpers/checkout-flow';


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

      it("back to top should be visible on homepage after scrolling and clicking it should take the page to the top", () => {

        const homePage = waitForPage('homepage', 'getHomePage');
        cy.visit('/');
        cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);

        acceptPrivaryTerm();

        scrollToBottomOfPageAndClickBackToTopButton();
      });

      it("back to top should be visible on PLP after scrolling and clicking it should take the page to the top", () => {

        cy.intercept(infiniteScroll.testUrl).as('getProductListPage');
        cy.visit(infiniteScroll.testUrl);
        cy.wait(`@getProductListPage`).its('response.statusCode').should('eq', 200);

        acceptPrivaryTerm();

        scrollToBottomOfPageAndClickBackToTopButton();
      });

      it("back to top should be visible on PDP after scrolling and clicking it should take the page to the top", () => {

        cy.intercept(infiniteScroll.pdp).as('getProductDetailPage');
        cy.visit(infiniteScroll.pdp);
        cy.wait('@getProductDetailPage').its('response.statusCode').should('eq', 200);

        acceptPrivaryTerm();

        cy.get('[role="region"] > :nth-child(1)').click();
        cy.scrollTo("top");
        cy.get(`.cx-scroll-to-top-btn`).should('not.be.visible');
        //scroll just until Product Details header comes into frame
        cy.get('cx-product-images > .is-initialized > img').scrollIntoView();
        cy.get(`.cx-scroll-to-top-btn`).should('not.be.visible');
        cy.get('[role="region"] > :nth-child(1)').click();
        cy.get(`.cx-scroll-to-top-btn`).should('be.visible');
        cy.get(`.cx-scroll-to-top-btn`).click();

        cy.window().its('scrollY').should('equal', 0);
      });

      it("back to top should be visible on Cart page after scrolling and clicking it should take the page to the top", () => {

        cy.intercept(infiniteScroll.testUrl).as('getProductListPage');
        cy.visit(infiniteScroll.testUrl);
        cy.wait(`@getProductListPage`).its('response.statusCode').should('eq', 200);

        acceptPrivaryTerm();

        addToCartFromList(6);

        clickCartIcon();

        scrollToBottomOfPageAndClickBackToTopButton();
      });
    });
    });
  });



