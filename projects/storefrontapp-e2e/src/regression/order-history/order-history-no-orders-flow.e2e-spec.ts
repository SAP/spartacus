import { HomePage } from '../../page-objects/home.po';
import { OrderHistoryPage } from '../../page-objects/account/order-history.po';
import { LoginPage } from '../../page-objects/login/login.po';
import { LoginHelper } from '../../page-objects/login/login.helper';
import { browser } from 'protractor';

describe('Order History with no orders', () => {
  const home: HomePage = new HomePage();
  const orderHistoryPage: OrderHistoryPage = new OrderHistoryPage();
  const loginPage: LoginPage = new LoginPage();

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

    // Log out.
    await LoginHelper.logOutViaHeader();
    expect(await home.header.isLoggedIn()).toBeFalsy();
  });

  it('should redirect to login page if user is not logged in', async () => {
    // Go to order history
    await orderHistoryPage.navigateWithRedirect();
    expect(await browser.getCurrentUrl()).toBe('http://localhost:4200/login');
    expect(await loginPage.page.isDisplayed());
    expect(await loginPage.page.getText()).toContain('Sign In / Register');
    expect(await loginPage.loginForm.waitForReady());
  });

  it('should go to Order History once user has logged in', async () => {
    const loginForm = loginPage.loginForm;
    await loginForm.fillInForm(LoginHelper.userEmail, LoginHelper.userPassword);
    await loginForm.submitLoginWithRedirect();
    browser.wait(browser.getCurrentUrl(), 60000);
    expect(await browser.getCurrentUrl()).toBe(
      'http://localhost:4200/my-account/orders'
    );
    expect(await orderHistoryPage.historyHeader.getText()).toContain(
      'Order history'
    );
  });

  it('should be able to start shopping from an empty Order History', async () => {
    await orderHistoryPage.startShopping();
    await home.waitForReady();
    expect(await home.splashBanner.isDisplayed());
  });
});
