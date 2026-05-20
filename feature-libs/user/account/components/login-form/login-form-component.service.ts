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
  GlobalMessageService,
  GlobalMessageType,
  OAUTH_REDIRECT_FLOW_KEY,
  WindowRef,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject, from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class LoginFormComponentService {
  protected authConfigService = inject(AuthConfigService);
  private featureConfigService = inject(FeatureConfigService);
  protected csrfStateService = inject(CsrfStateService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
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
      this.setOauthRedirectFlowFlag();
      nativeForm.submit();
      this.busy$.next(true);
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
    const error = this.activatedRoute.snapshot.queryParams['error'];
    if (error) {
      this.clearOauthRedirectFlowFlag();
      this.globalMessage.add(
        {
          key: this.customFormValidErrors.includes(error)
            ? `customLoginPage.badRequest.${error}`
            : 'customLoginPage.badRequest.unknown_error',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      this.router.navigate([], {
        queryParams: { error: null },
      });
    }
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
