import { viewportContext } from '../../../helpers/viewport-context';
import * as savedCart from '../../../helpers/saved-cart';
import {
  verifyModalTabbingOrder,
  visitCartPage,
  waitForCartPageData,
  waitForSavedCartDetailsPageData,
} from '../../../helpers/b2b/b2b-saved-cart';
import * as sampleData from '../../../sample-data/saved-cart';
context('B2C - Saved Cart', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
    });
  });

  describe('Accessibility - keyboarding', () => {
    describe('Cart page', () => {
      it('should conform to tabbing order', () => {
        savedCart.verifyCartPageTabbingOrder();
      });
    });

    describe('Modal', () => {
      before(() => {
        savedCart.login();
        waitForCartPageData(sampleData.products[1]);
        visitCartPage();
      });

      it('should conform to tabbing order', () => {
        verifyModalTabbingOrder();
      });
    });

    describe('Saved Cart Details Page', () => {
      before(() => {
        savedCart.login();
        waitForSavedCartDetailsPageData(sampleData.products[0]);
      });

      it('should conform to tabbing order', () => {
        savedCart.verifyDetailsTabbingOrder();
      });
    });
  });
});
