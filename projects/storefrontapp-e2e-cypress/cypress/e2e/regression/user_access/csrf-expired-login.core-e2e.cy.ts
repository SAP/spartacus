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
 * Recovery on CSRF refresh failure:
 * The `catchError` in `login()` redirects to `/login?error=session_expired`,
 * and `handleCustomLoginError()` (run on the freshly-constructed
 * LoginFormComponent) maps that error code to the
 * `httpHandlers.sessionExpired` translation key, dispatches the global
 * error message, and strips the query param. The user can then retype
 * their credentials on the now-fresh form and submit normally — no
 * additional click is required to "kick off" the recovery.
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

  it('should redirect to /login?error=session_expired and show the friendly error when CSRF refresh returns 403', () => {
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

      // catchError navigates to /login?error=session_expired.
      // handleCustomLoginError() (run on the freshly-constructed
      // LoginFormComponent) maps that error code to the
      // httpHandlers.sessionExpired translation key, dispatches it as a
      // global error, and strips the query param.
      alerts
        .getErrorAlert()
        .should('contain', 'Your session has expired. Please login again.');
      cy.url().should('include', '/login');
      cy.get('cx-login-form button[type="submit"]').should('not.be.disabled');

      // Second click: re-fill credentials on the now-fresh form and submit.
      // We stub the POST so the test does not depend on the cross-origin
      // OAuth code-grant + token exchange completing inside Cypress (those
      // steps span auth-server origins where Cypress's interception/storage
      // access is unreliable). Reaching this POST with a fully-populated
      // body proves the recovery path produces a healthy submit; the actual
      // OAuth token exchange is verified by manual JDK21 testing and by
      // test 1's body-shape assertions.
      cy.intercept(
        { method: 'POST', url: `${config.loginUrl}*` },
        { statusCode: 200, body: '' }
      ).as('retryLoginPost');

      fillCustomLoginForm({
        username: defaultUser.name,
        password: defaultUser.password,
      });

      cy.wait('@retryLoginPost').then((interception) => {
        const body = interception.request.body as string;
        expect(body, 'retry POST body must not be empty').to.not.be.empty;
        expect(body).to.match(/(^|&)username=/);
        expect(body).to.match(/(^|&)password=/);
        expect(body).to.match(/(^|&)_csrf=/);
      });
    });
  });
});
