export const apiUrl = Cypress.env('API_URL');
export const USERID_CURRENT = 'current';
export const config = {
  tokenUrl: `${apiUrl}/authorizationserver/oauth/token`,
  newUserUrl: `${apiUrl}/rest/v2/electronics-spa/users/?lang=en&curr=USD`,
  client: {
    client_id: Cypress.env('CLIENT_ID'),
    client_secret: Cypress.env('CLIENT_SECRET'),
  },
};

export function login(
  uid: string,
  password: string,
  failOnStatusCode: boolean = true
) {
  return cy.request({
    method: 'POST',
    url: config.tokenUrl,
    body: {
      ...config.client,
      grant_type: 'password',
      username: uid,
      password,
    },
    form: true,
    failOnStatusCode,
  });
}

export function setSessionData(data) {
  const authData = {
    userToken: {
      token: { ...data, userId: USERID_CURRENT },
    },
  };
  cy.window().then(win => {
    const storageKey = 'spartacus-local-data';
    let state;
    try {
      state = JSON.parse(win.localStorage.getItem(storageKey));
      if (state === null) {
        state = {};
      }
    } catch (e) {
      state = {};
    }
    state.auth = authData;
    win.localStorage.setItem(storageKey, JSON.stringify(state));
    cy.log('storing session state key: ', storageKey);
    cy.log('storing session state value:', JSON.stringify(state));
  });
  return data;
}

export function retrieveAuthToken() {
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
