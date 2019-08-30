import * as checkoutAsPersistentUser from '../../helpers/checkout-as-persistent-user';
import { formats } from '../../sample-data/viewports';
import { config, login, setSessionData } from '../../support/utils/login';

function checkoutAsPersistentUserTest() {
  const username = 'test-user-cypress@ydev.hybris.com';
  const password = 'Password123.';
  const firstName = 'Test';
  const lastName = 'User';
  const titleCode = 'mr';

  describe('Checkout Flow', () => {
    before(() => {
      function retrieveAuthToken() {
        return cy.request({
          method: 'POST',
          url: config.tokenUrl,
          body: {
            ...config.client,
            grant_type: 'client_credentials',
          },
          form: true,
        });
      }

      login(username, password, false).then(res => {
        if (res.status === 200) {
          // User is already registered - only set session in localStorage
          setSessionData({ ...res.body, userId: username });
        } else {
          // User needs to be registered
          retrieveAuthToken().then(response =>
            cy.request({
              method: 'POST',
              url: config.newUserUrl,
              body: {
                firstName: firstName,
                lastName: lastName,
                password: password,
                titleCode: titleCode,
                uid: username,
              },
              headers: {
                Authorization: `bearer ` + response.body.access_token,
              },
            })
          );
        }
      });
    });

    it('should login successfully', () => {
      checkoutAsPersistentUser.loginSuccessfully();
    });

    it('should add a shipping address', () => {
      checkoutAsPersistentUser.addShippingAddress();
    });

    it('should go to product page from category page', () => {
      checkoutAsPersistentUser.goToProductPageFromCategory();
    });

    it('should add product to cart', () => {
      checkoutAsPersistentUser.addProductToCart();
    });

    it('should get cartId and add a payment method', () => {
      checkoutAsPersistentUser.addPaymentMethod();
    });

    it('should proceed to checkout and select shipping address', () => {
      checkoutAsPersistentUser.selectShippingAddress();
    });

    it('should choose delivery', () => {
      checkoutAsPersistentUser.selectDeliveryMethod();
    });

    it('should select payment method', () => {
      checkoutAsPersistentUser.selectPaymentMethod();
    });

    it('should review and place order', () => {
      checkoutAsPersistentUser.verifyAndPlaceOrder();
    });

    it('should display summary page', () => {
      checkoutAsPersistentUser.displaySummaryPage();
    });

    it('should delete shipping address', () => {
      checkoutAsPersistentUser.deleteShippingAddress();
    });

    it('should delete payment card', () => {
      checkoutAsPersistentUser.deletePaymentCard();
    });
  });
}

context('Checkout with persistent user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  checkoutAsPersistentUserTest();
});

context(
  `${formats.mobile.width + 1}p resolution - Checkout with persistent user`,
  () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });
    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });
    afterEach(() => {
      cy.saveLocalStorage();
    });
    checkoutAsPersistentUserTest();
  }
);
