export const apiUrl = Cypress.env('API_URL');
export const config = {
  tokenUrl: `${apiUrl}/authorizationserver/oauth/token`,
  newUserUrl: `${apiUrl}/rest/v2/electronics/users/?lang=en&curr=USD`,
  client: {
    client_id: Cypress.env('CLIENT_ID'),
    client_secret: Cypress.env('CLIENT_SECRET')
  }
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
      password
    },
    form: true,
    failOnStatusCode
  });
}

export function setSessionData(data) {
  const authData = {
    userToken: {
      token: data
    },
    clientToken: {
      loading: false,
      error: false,
      success: false
    }
  };
  cy.window().then(win => {
    win.sessionStorage.setItem('auth', JSON.stringify(authData));
  });
  return data;
}
