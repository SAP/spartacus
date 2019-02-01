import { HomePage } from '../../page-objects/home.po';
import { OrderHistoryPage } from '../../page-objects/account/order-history.po';
import { LoginHelper } from '../../page-objects/login/login.helper';
import { CheckoutHelper } from '../../page-objects/checkout/checkout.helper';
import { OrderConfirmationPage } from '../../page-objects/checkout/order-confirmation.po';
import { browser } from 'protractor';

describe('Order History with orders', () => {
  const home: HomePage = new HomePage();
  const orderHistoryPage: OrderHistoryPage = new OrderHistoryPage();
  const orderConfirmationPage: OrderConfirmationPage = new OrderConfirmationPage();

  const USER_FULL_NAME = `${LoginHelper.DEFAULT_FIRST_NAME} ${
    LoginHelper.DEFAULT_LAST_NAME
  }`;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    // Go to Home
    await home.navigateTo();
    await home.waitForReady();

    // Register a new user.
    await LoginHelper.registerNewUser();
    expect(await home.header.isLoggedIn()).toBeTruthy();
    expect(await home.header.loginComponent.getText()).toContain(
      USER_FULL_NAME
    );
  });

  // this test has to run first or alone, otherwise if will fail because the orders take time to show up in Order History
  xit('should display in Order History after placing orders', async () => {
    // place order and extract order Number from order Confirmation Page
    await CheckoutHelper.checkout();
    expect(await orderConfirmationPage.confirmationHeader.getText()).toContain(
      'Confirmation of Order'
    );

    function extractOrderNumber(text) {
      return text.split(': ')[1];
    }
    const orderNumber1 = extractOrderNumber(
      await orderConfirmationPage.confirmationHeader.getText()
    );

    // verify order is now displayed in Order History
    browser.wait(orderHistoryPage.navigateTo(), 60000);
    await orderHistoryPage.navigateTo();
    expect(await orderHistoryPage.historyHeader.getText()).toContain(
      'Order history'
    );

    expect(await orderHistoryPage.orderNumber.isDisplayed());
    expect(await orderHistoryPage.orderNumber.getText()).toContain(
      orderNumber1
    );
  });
});
