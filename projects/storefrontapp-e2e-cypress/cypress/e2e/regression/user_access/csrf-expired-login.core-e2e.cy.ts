/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillCustomLoginForm } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { defaultUser } from '../../../helpers/login';
import { whenJDK21 } from '../../../support/utils/jdk-versions';
import { config, visitLoginPage } from '../../../support/utils/login';

/**
 * CXSPA-13213: CSRF token expiry handling on the login page.
 *
 * Background — the bug we fixed:
 * `LoginFormComponentService.login()` used to call `busy$.next(true)` BEFORE
 * `nativeForm.submit()`. Through `isUpdating$.tap()`, that triggered
 * `form.disable()`, which sets `disabled=true` on every bound <input>. The
 * browser drops disabled inputs from native form submissions, so the POST
 * to /authorizationserver/login carried an empty body and the auth server
 * returned 403. Fix: submit the native form first, flip busy$ afterwards.
 *
 * The expiry-recovery scenarios below also depend on the form being enabled
 * at the moment of submit (otherwise the recovery branch never gets a chance
 * to run with real credentials).
 *
 * Only applies to JDK21 (Authorization Code Flow with custom login form).
 * JDK17 uses Resource Owner Password Credentials flow with no CSRF form field.
 */
describe('Login - CSRF token expiry handling (JDK21 only)', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.window().then((win) => win.localStorage.clear());
  });

  it('should submit a fully-populated form body on a normal login click (regression: form must not be disabled at submit time)', () => {
    whenJDK21(() => {
      visitLoginPage();
      cy.get('cx-login-form [formcontrolname="userId"]').should('be.visible');

      // Stub the login POST so the test does not actually authenticate /
      // navigate away. We only care about the request *body* the browser
      // serializes. If the form is disabled at submit time, the body will
      // be empty (the original bug).
      cy.intercept(
        { method: 'POST', url: `${config.loginUrl}*` },
        { statusCode: 200, body: '' }
      ).as('loginPost');

      fillCustomLoginForm({
        username: defaultUser.name,
        password: defaultUser.password,
      });

      cy.wait('@loginPost').then((interception) => {
        const body = interception.request.body as string;

        // Sanity: real form-encoded body, not empty.
        expect(body, 'POST body must not be empty').to.not.be.empty;

        // All three form fields must be present in the serialized body.
        expect(body).to.match(/(^|&)username=/);
        expect(body).to.match(/(^|&)password=/);
        expect(body).to.match(/(^|&)_csrf=/);
      });
    });
  });

  it('should show session-expired error and recover via loginWithRedirect when CSRF refresh returns 403', () => {
    whenJDK21(() => {
      // Visit login page — the global CSRF interceptor (csrf-global-interceptor.ts)
      // handles the page-load CSRF fetch triggered by CustomLoginGuard.
      visitLoginPage();
      cy.get('cx-login-form [formcontrolname="userId"]').should('be.visible');

      // First click: simulate expired CSRF token. `times: 1` ensures the
      // already-completed page-load request is unaffected.
      cy.intercept(
        { method: 'GET', url: config.csrfUrl, times: 1 },
        { statusCode: 403 }
      ).as('csrfRefreshFail');

      fillCustomLoginForm({
        username: defaultUser.name,
        password: defaultUser.password,
      });

      cy.wait('@csrfRefreshFail').its('response.statusCode').should('eq', 403);

      // Friendly error from httpHandlers.sessionExpired translation key,
      // user stays on the login page (not on the backend 403 error page),
      // form is re-enabled so the user can retry.
      alerts
        .getErrorAlert()
        .should('contain', 'Your session has expired. Please login again.');
      cy.url().should('include', '/login');
      cy.get('cx-login-form button[type="submit"]').should('not.be.disabled');

      // Second click: the service must call loginWithRedirect() which
      // redirects the browser to /authorize to start a fresh PKCE auth
      // session. Stub /authorize with a 302 to the storefront's /login page
      // so the browser performs a real (but fast, same-origin) navigation —
      // avoiding a 60s "page load" timeout while still letting us assert
      // that the user did NOT end up authenticated.
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/authorizationserver/oauth/authorize*`,
        {
          statusCode: 302,
          headers: { Location: `${Cypress.config('baseUrl')}/login` },
        }
      ).as('authorizeRedirect');

      cy.get('cx-login-form button[type="submit"]').click();

      // Verify the full auth flow was restarted — not just a CSRF refresh —
      // and that the browser landed back on /login.
      cy.wait('@authorizeRedirect')
        .its('request.url')
        .should('include', 'authorizationserver/oauth/authorize');
      cy.url().should('include', '/login');

      // After the failed-then-restarted attempt, the user must NOT be
      // logged in: no auth tokens persisted, login form rendered fresh.
      cy.window().then((win) => {
        const localStorageDump = JSON.stringify(win.localStorage);
        expect(localStorageDump).to.not.match(/access_token/i);
        expect(localStorageDump).to.not.match(/refresh_token/i);
      });

      // After the recovery redirect lands back on /login, the form is
      // freshly rendered with empty values. The auth-server round-trip
      // (loginWithRedirect → /authorize → 302 back to /login) is a real
      // top-level browser navigation; OAuthLibWrapperService.initLoginFlow()
      // does not preserve client-side form state, so a new
      // LoginFormComponentService with an empty UntypedFormGroup is created
      // on return.
      cy.get('cx-login-form [formcontrolname="userId"]')
        .should('be.visible')
        .and('have.value', '');
      cy.get('cx-login-form [formcontrolname="password"]').should(
        'have.value',
        ''
      );

      // Final assertion: the user can submit the now-restored fresh form
      // with valid credentials. This is the third interaction the user
      // performs in the manual flow:
      //   click 1 → CSRF 403 → friendly error, fields preserved
      //   click 2 → loginWithRedirect → browser round-trip → form cleared
      //   click 3 → re-fill, submit → POST to auth server with full body
      //
      // We stub the third login POST so the test does not depend on the
      // cross-origin OAuth code-grant + token exchange completing inside
      // Cypress (those steps span auth-server origins where Cypress's
      // interception/storage access is unreliable). The fact that we reach
      // this POST with a fully-populated body proves the form-state-after-
      // recovery is healthy — the actual OAuth token exchange is verified
      // by manual JDK21 testing and by the happy-path test's body-shape
      // assertions.
      cy.intercept(
        { method: 'POST', url: `${config.loginUrl}*` },
        { statusCode: 200, body: '' }
      ).as('thirdLoginPost');

      fillCustomLoginForm({
        username: defaultUser.name,
        password: defaultUser.password,
      });

      cy.wait('@thirdLoginPost').then((interception) => {
        const body = interception.request.body as string;
        expect(body, 'third-attempt POST body must not be empty').to.not.be
          .empty;
        expect(body).to.match(/(^|&)username=/);
        expect(body).to.match(/(^|&)password=/);
        expect(body).to.match(/(^|&)_csrf=/);
      });
    });
  });
});
