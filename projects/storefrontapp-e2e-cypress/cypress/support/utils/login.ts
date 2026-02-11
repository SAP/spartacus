/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { whenJDK17 } from './jdk-versions';

export const USERID_CURRENT = 'current';
export const config = {
  authorizeUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/authorize`,
  loginUrl: `${Cypress.env('API_URL')}/authorizationserver/login`,
  csrfUrl: `${Cypress.env('API_URL')}/authorizationserver/csrf`,
  tokenUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/token`,
  revokeTokenUrl: `${Cypress.env('API_URL')}/authorizationserver/oauth/revoke`,
  customLoginOrigin: Cypress.config('baseUrl'),
  returnUri: `${Cypress.config('baseUrl')}/cy`,
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

type CSRFResponse = {
  headerName: string;
  parameterName: string;
  token: string;
};

type PKCE = {
  code_verifier: string;
  code_challenge: string;
};

/**
 * Log in using  ResourceOwnerPasswordCredentials flow
 *
 * Note: Not supported for JDK21
 */
export function resourceOwnerPasswordCredentialsGrant(
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

/**
 * Log in using AuthorizationCodeGrant flow
 *
 * Note: only flow JDK21 supports.
 */
export function authorizationCodeGrant(
  uid: string,
  password: string,
  failOnStatusCode: boolean = true
) {
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
          redirect_uri: config.returnUri,
        },
        headers: {
          Origin: Cypress.config('baseUrl'),
        },
        followRedirect: false,
      })
      .then((response) => {
        if (response.status == 200) {
          // extract CSRF token from auth server login page HTML
          return cy.wrap(
            (response.body as string).match(/_csrf"\s+value="([^"]+)"/)[1]
          );
        } else if (response.status == 302) {
          // redirect to custom login page, fetch csrf to continue
          return cy
            .request<CSRFResponse>({
              method: 'GET',
              url: config.csrfUrl,
              headers: {
                Origin: config.customLoginOrigin,
              },
            })
            .then((csrfResponse) => csrfResponse.body.token);
        } else {
          throw new Error(
            `Unexpected /authorize response status: ${response.status}. Expected 200 or 302.`
          );
        }
      })
      .then((csrfToken) => {
        return cy
          .request({
            method: 'POST',
            url: config.loginUrl,
            form: true,
            body: {
              username: uid,
              password,
              _csrf: csrfToken,
            },
            failOnStatusCode,
            followRedirect: false,
          })
          .then((res) => {
            const parsedUrl = new URL(res.redirectedToUrl);
            if (parsedUrl.searchParams.has('error')) {
              // if the login failed, the URL will contain an error parameter
              cy.log(`login failed:`);
              return cy.wrap({
                status: 401,
                body: {},
              } as Cypress.Response<TokenResponse>);
            } else {
              // the auth server issues a 302-redirect-loopback, so we must follow this redirect manually
              // to get next redirect response that will be to the return URI.
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
                      redirect_uri: config.returnUri,
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

export async function createPKCE(): Promise<PKCE> {
  const code_verifier = toBase64url(crypto.getRandomValues(new Uint8Array(32)));

  // Encode the input string as a Uint8Array
  const data = new TextEncoder().encode(code_verifier);

  // Generate the SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash to a base64url string
  const code_challenge = toBase64url(new Uint8Array(hashBuffer));

  return { code_verifier, code_challenge };
}

/**
 * Login function to get access token.
 *
 * This function is version-aware and will select between resourceOwnerPasswordCredentialsGrant for JDK17
 * and authorizationCodeGrant for JDK21.
 */
export function login(
  uid: string,
  password: string,
  failOnStatusCode: boolean = true
) {
  return whenJDK17(
    () =>
      resourceOwnerPasswordCredentialsGrant(uid, password, failOnStatusCode),
    () => authorizationCodeGrant(uid, password, failOnStatusCode)
  );
}

export function visitLoginPage() {
  whenJDK17(
    () => cy.visit('/login'),
    () => cy.visit('/sign-in')
  );
}
