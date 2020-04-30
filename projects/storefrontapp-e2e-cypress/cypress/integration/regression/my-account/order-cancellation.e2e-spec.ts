import {
  addProductToShoppingCart,
  loginUser,
  register,
} from '../../../helpers/order-cancellation';

context('Order Cancellation - Desktop', () => {
  before(() => {
    cy.window().then((win: Window) => {
      win.localStorage.clear();
    });
  });

  describe('Order Placement', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should register a user', () => {
      register();
    });

    it('should login and redirect to front page', () => {
      loginUser();
    });

    it('should add a product to cart', () => {
      addProductToShoppingCart();
    });
  });
});
