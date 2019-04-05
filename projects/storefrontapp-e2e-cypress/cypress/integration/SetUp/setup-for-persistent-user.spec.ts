import { config, login, setSessionData } from '../../support/utils/login';

describe('Setup for Persistent User', () => {
  const username = 'test-user-cypress@ydev.hybris.com';
  const password = 'Password123.';
  const firstName = 'Test';
  const lastName = 'User';
  const titleCode = 'mr';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register user', () => {
    function loginAsGuest() {
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
    /* User needs to be registered
      1. Login as guest for access token
      2. Create new user
    */
    login(username, password, false).then(res => {
      if (res.status === 200) {
        // User is already registered - only set session in sessionStorage
        setSessionData({ ...res.body, userId: username });
      } else {
        /* User needs to be registered
         1. Login as guest for access token
         2. Create new user
      */
        loginAsGuest().then(response =>
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
});
