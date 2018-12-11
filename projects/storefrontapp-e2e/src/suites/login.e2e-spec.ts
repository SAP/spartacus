import { HomePage } from '../page-objects/home.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { LoginPage } from '../page-objects/login/login.po';
import { by, element } from 'protractor';

fdescribe('Login', () => {
  const home: HomePage = new HomePage();
  const login: LoginPage = new LoginPage();

  const USER_FULL_NAME = `${LoginHelper.DEFAULT_FIRST_NAME} ${
    LoginHelper.DEFAULT_LAST_NAME
  }`;

  const WRONG_PASSWORD = 'password';

  beforeAll(async () => {
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

    // Check that we are not logged in
    expect(await home.header.isLoggedIn()).toBeFalsy();
  });

  it('should login successfully with correct credentials', async () => {
    // Login again
    await LoginHelper.loginUserViaHeader(
      LoginHelper.userEmail,
      LoginHelper.userPassword
    );
    await home.waitForReady();
    expect(await home.header.isLoggedIn()).toBeTruthy();
    expect(await home.header.loginComponent.getText()).toContain(
      USER_FULL_NAME
    );

    // Log out.
    await LoginHelper.logOutViaHeader();

    // Check that we are not logged in
    expect(await home.header.isLoggedIn()).toBeFalsy();
  });

  it('login should fail if password is wrong', async () => {
    // Login with wrong password
    await LoginHelper.loginUserViaHeader(LoginHelper.userEmail, WRONG_PASSWORD);

    expect(await home.header.isLoggedIn()).toBeFalsy();
    /*
    expect(await login.page.getText()).toContain(
      'Bad credentials. Please login again.'
    );
    */
    const error = await element(by.tagName('cx-global-message')).element(
      by.css('.alert-danger')
    );
    expect(error).toBeTruthy();
    expect(await error.getText()).toContain(
      'Bad credentials. Please login again.'
    );
  });
});
