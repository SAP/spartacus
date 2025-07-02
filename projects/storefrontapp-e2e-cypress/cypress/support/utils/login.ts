/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const USERID_CURRENT = 'current';
export const config = {
  authorizeUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/authorize`,
  loginUrl: `${Cypress.env('API_URL')}/authorizationserver/login`,
  tokenUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/token`,
  revokeTokenUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/revoke`,
  newUserUrl: `${Cypress.env('API_URL')}/${Cypress.env(
    'OCC_PREFIX'
  )}/${Cypress.env('BASE_SITE')}/users?lang=en&curr=${Cypress.env(
    'BASE_CURRENCY'
  )}`,
  client: {
    client_id: Cypress.env('CLIENT_ID'),
    client_secret: Cypress.env('CLIENT_SECRET'),
  },
};

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  token_type: 'Bearer';
  expires_in: number;
};

/**
 * ResourceOwnerPasswordCredentials
 *
 * @deprecated Not supported for JDK21
 */
export function loginJDK17(
  uid: string,
  password: string,
  failOnStatusCode: boolean = true
) {
  return cy.request<TokenResponse>({
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

/** JDK21 */
export function loginJDK21(
  uid: string,
  password: string,
  failOnStatusCode: boolean = true
) {
  const returnUri = 'http://localhost:4200/cy';

  return cy.wrap<Promise<PKCE>, PKCE>(createPKCE()).then((pkce) => {
    return cy
      .request({
        method: 'GET',
        url: config.authorizeUrl,
        failOnStatusCode,
        qs: {
          response_type: 'code',
          client_id: config.client.client_id,
          code_challenge: pkce.code_challenge,
          code_challenge_method: 'S256',
          redirect_uri: returnUri,
        },
        headers: {
          Origin: 'http://localhost:4200',
        },
      })
      .then((response) => {
        const csrfMatch = response.body.match(/_csrf"\s+value="([^"]+)"/);

        return cy
          .request({
            method: 'POST',
            url: config.loginUrl,
            form: true,
            body: {
              username: uid,
              password,
              _csrf: csrfMatch?.[1],
            },
            failOnStatusCode,
            followRedirect: false,
          })
          .then((res) => {
            if (res.redirectedToUrl.includes('login?error')) {
              cy.log(`login failed:`);
              return cy.wrap({
                status: 401,
                body: {},
              } as Cypress.Response<TokenResponse>);
            } else {
              return cy
                .request({
                  method: 'GET',
                  url: res.redirectedToUrl,
                  followRedirect: false,
                })
                .then((res) => {
                  const parsedUrl = new URL(res.redirectedToUrl);
                  const code = parsedUrl.searchParams.get('code');

                  return cy.request<TokenResponse>({
                    url: config.tokenUrl,
                    method: 'POST',
                    form: true,
                    body: {
                      client_id: config.client.client_id,
                      grant_type: 'authorization_code',
                      code,
                      redirect_uri: returnUri,
                      code_verifier: pkce.code_verifier,
                    },
                  });
                });
            }
          });
      });
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

function toBase64url(uint8Array: Uint8Array): string {
  // Convert Uint8Array to a string
  const binaryString = Array.from(uint8Array)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  // Encode the string to base64url
  return btoa(binaryString)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

type PKCE = {
  code_verifier: string;
  code_challenge: string;
};
export async function createPKCE(): Promise<PKCE> {
  const randomNumber = await crypto.getRandomValues(new Uint8Array(32));

  const code_verifier = toBase64url(randomNumber);
  // Encode the input string as a Uint8Array
  const data = new TextEncoder().encode(code_verifier);

  // Generate the SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash to a base64url string
  const code_challenge = toBase64url(new Uint8Array(hashBuffer));

  return { code_verifier, code_challenge };
}

export { loginJDK21 as login };
