/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthConfigService,
  AuthService,
  CsrfStateService,
  FeatureConfigService,
  FederatedLoginService,
  GlobalMessageService,
  GlobalMessageType,
  OAUTH_REDIRECT_FLOW_KEY,
  WindowRef,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, from } from 'rxjs';
import { catchError, take, tap, withLatestFrom } from 'rxjs/operators';

const LOGIN_ERROR_KEY = 'cx_login_error';

@Injectable()
export class LoginFormComponentService {
  protected authConfigService = inject(AuthConfigService);
  private featureConfigService = inject(FeatureConfigService);
  protected csrfStateService = inject(CsrfStateService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected federatedLoginService = inject(FederatedLoginService);
  protected readonly customFormValidErrors = [
    'bad_credentials',
    'account_disabled',
  ];

  action?: string;
  method?: string;
  protected busy$ = new BehaviorSubject(false);
  get csrf() {
    return this.csrfStateService.get();
  }

  isUpdating$ = this.busy$.pipe(
    tap((state) => {
      const userId = this.winRef.nativeWindow?.history?.state?.['newUid'];
      if (userId) {
        this.form.patchValue({ userId });
      }
      state === true ? this.form.disable() : this.form.enable();
    })
  );

  showResetPassword = !this.federatedLoginService.isLoginDomain;

  form: UntypedFormGroup = new UntypedFormGroup({
    userId: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    protected auth: AuthService,
    protected globalMessage: GlobalMessageService,
    protected winRef: WindowRef
  ) {
    if (this.featureConfigService.isEnabled('authorizationCodeFlowByDefault')) {
      this.initCustomLogin();
    }
  }

  login(nativeForm?: HTMLFormElement) {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (
      this.featureConfigService.isEnabled('authorizationCodeFlowByDefault') &&
      nativeForm
    ) {
      if (
        this.featureConfigService.isEnabled(
          'authorizationCodeFlowByDefaultCsrfTokenRefresh'
        )
      ) {
        // CXSPA-13213: refresh the CSRF token immediately before the
        // native form submit. The auth server rotates per-request, so a
        // stale page-load token would 403. A 403 on this GET also
        // signals that the auth-server session no longer holds a
        // pending PKCE authorization request — handled in catchError
        // below by redirecting to /login?error=session_expired so the
        // existing handleCustomLoginError() pipeline shows the friendly
        // message.
        this.auth
          .refreshCsrfToken()
          .pipe(
            take(1),
            tap((csrfToken) => {
              this.csrfStateService.set(csrfToken);
              this.form.get('csrf')?.setValue(csrfToken.token);
              this.setOauthRedirectFlowFlag();
              // Submit BEFORE flipping busy$ to true. busy$=true triggers
              // form.disable(), which sets disabled=true on every bound input,
              // and the browser excludes disabled inputs from native form
              // submissions — resulting in an empty POST body and a 403.
              nativeForm.submit();
              this.busy$.next(true);
            }),
            catchError(() => {
              this.busy$.next(false);
              this.clearOauthRedirectFlowFlag();
              // Use a hard browser navigation (window.location.href) instead
              // of router.navigate(['/login'], { queryParams: ... }). The
              // router-based in-app navigation reuses the current
              // LoginFormComponent and — by Angular's default route-reuse
              // strategy — does NOT re-run CustomLoginGuard.canActivate(),
              // which is the only place that fetches a fresh CSRF token
              // (authService.getCsrfToken()) and binds it to a fresh
              // auth-server session. Without that re-run, the next Sign In
              // click reuses the dead JSESSIONID and 403s again.
              // A real page load (which is what the user would do manually
              // by refreshing) re-bootstraps Angular and re-runs the guard,
              // producing a healthy CSRF token + session. window.location.href
              // is the smallest change that replicates that behavior on the
              // recovery path.
              //
              // Why sessionStorage instead of `?error=session_expired` on
              // the URL: CustomLoginGuard re-runs on the hard redirect and
              // can itself navigate (e.g. its own catchError calls
              // createRoute('login'), which strips query params via UrlTree).
              // A query param is therefore not guaranteed to survive the
              // re-bootstrap. sessionStorage survives any number of
              // intermediate redirects within the same browsing context
              // and is read once + cleared by handleCustomLoginError().
              if (this.winRef.isBrowser()) {
                this.winRef.sessionStorage?.setItem(
                  LOGIN_ERROR_KEY,
                  'session_expired'
                );
                this.winRef.nativeWindow!.location.href = '/login';
              }
              return EMPTY;
            })
          )
          .subscribe();
      } else {
        this.setOauthRedirectFlowFlag();
        nativeForm.submit();
        this.busy$.next(true);
      }
    } else {
      this.busy$.next(true);

      from(
        this.auth.loginWithCredentials(
          // TODO: consider dropping toLowerCase as this should not be part of the UI,
          // as it's too opinionated and doesn't work with other AUTH services
          this.form.value.userId.toLowerCase(),
          this.form.value.password
        )
      )
        .pipe(
          withLatestFrom(this.auth.isUserLoggedIn()),
          tap(([_, isLoggedIn]) => this.onSuccess(isLoggedIn))
        )
        .subscribe();
    }
  }

  handleCustomLoginError(): void {
    if (
      !this.featureConfigService.isEnabled('authorizationCodeFlowByDefault')
    ) {
      return;
    }
    // First, drain any error stashed in sessionStorage by the catchError
    // hard-redirect path (see login()). sessionStorage survives the
    // re-bootstrap that the hard redirect causes, where a query param
    // would be lost to CustomLoginGuard's own internal redirects.
    if (this.winRef.isBrowser()) {
      const stashed = this.winRef.sessionStorage?.getItem(LOGIN_ERROR_KEY);
      if (stashed) {
        this.winRef.sessionStorage?.removeItem(LOGIN_ERROR_KEY);
        this.clearOauthRedirectFlowFlag();
        this.globalMessage.add(
          { key: this.resolveLoginErrorKey(stashed) },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
    }
    // Then handle errors arriving via query param (e.g. bad_credentials
    // round-trip from the auth server). Subscribe to queryParams (not
    // snapshot) so this also fires on in-place navigations that don't
    // re-construct LoginFormComponent.
    this.activatedRoute.queryParams.subscribe((params) => {
      const error = params['error'];
      if (error) {
        this.clearOauthRedirectFlowFlag();
        this.globalMessage.add(
          { key: this.resolveLoginErrorKey(error) },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        this.router.navigate([], {
          queryParams: { error: null },
        });
      }
    });
  }

  protected resolveLoginErrorKey(error: string): string {
    if (error === 'session_expired') {
      return 'httpHandlers.sessionExpired';
    }
    return this.customFormValidErrors.includes(error)
      ? `customLoginPage.badRequest.${error}`
      : 'customLoginPage.badRequest.unknown_error';
  }

  protected onSuccess(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      // We want to remove error messages on successful login (primary the bad
      // username/password combination)
      this.globalMessage.remove(GlobalMessageType.MSG_TYPE_ERROR);
      this.form.reset();
    }

    this.busy$.next(false);
  }

  protected initCustomLogin() {
    this.method = 'POST';
    this.action = this.authConfigService?.getCustomLoginFormEndpoint();
    this.form.addControl('csrf', new FormControl('', Validators.required));
    this.form.get('csrf')?.setValue(this.csrf?.token);
  }

  protected setOauthRedirectFlowFlag(): void {
    if (this.winRef.isBrowser()) {
      this.winRef.localStorage?.setItem(OAUTH_REDIRECT_FLOW_KEY, 'true');
    }
  }

  protected clearOauthRedirectFlowFlag(): void {
    if (this.winRef.isBrowser()) {
      this.winRef.localStorage?.removeItem(OAUTH_REDIRECT_FLOW_KEY);
    }
  }
}
