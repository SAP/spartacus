export const USERID_CURRENT = 'current';
export const config = {
  tokenUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/token`,
  revokeTokenUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/revoke`,
  newUserUrl: `${Cypress.env('API_URL')}/${Cypress.env(
    'OCC_PREFIX'
  )}/${Cypress.env('BASE_SITE')}/users/?lang=en&curr=USD`,
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
  const token = {};
  token['access_token_stored_at'] = '' + Date.now();
  if (data.expires_in) {
    const expiresInMilliseconds = data.expires_in * 1000;
    const now = new Date();
    const expiresAt = now.getTime() + expiresInMilliseconds;
    token['expires_at'] = '' + expiresAt;
  }

  const authData = { token: data, userId: USERID_CURRENT };

  cy.window().then((win) => {
    const storageKey = 'spartacus⚿⚿auth';
    let state;
    try {
      state = JSON.parse(win.localStorage.getItem(storageKey));
      if (state === null) {
        state = {};
      }
    } catch (e) {
      state = {};
    }
    state = { ...state, ...authData };
    win.localStorage.setItem(storageKey, JSON.stringify(state));
    Cypress.log({
      displayName: 'LoginUtil',
      message: [
        `storing session state with key '${storageKey}' and value: ${JSON.stringify(
          state
        )}`,
      ],
    });
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
