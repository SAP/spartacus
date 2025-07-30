/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthConfigService,
  AuthService,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject, from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class LoginFormComponentService {
  protected authConfigService = inject(AuthConfigService);
  protected isNewAuthFlow = inject(FeatureConfigService).isEnabled(
    'authorizationCodeFlowByDefault'
  );

  constructor(
    protected auth: AuthService,
    protected globalMessage: GlobalMessageService,
    protected winRef: WindowRef
  ) {
    if (this.isNewAuthFlow) {
      this.method = 'POST';
      this.action = this.authConfigService?.getCustomLoginFormEndpoint();
    }
  }

  protected busy$ = new BehaviorSubject(false);

  action?: string;
  method?: string;
  csrf$ = this.auth.getCsrfToken();

  isUpdating$ = this.busy$.pipe(
    tap((state) => {
      const userId = this.winRef.nativeWindow?.history?.state?.['newUid'];
      if (userId) {
        this.form.patchValue({ userId });
      }
      state === true ? this.form.disable() : this.form.enable();
    })
  );

  form: UntypedFormGroup = this.isNewAuthFlow
    ? new FormGroup({
        userId: new FormControl('', [
          Validators.required,
          CustomFormValidators.emailValidator,
        ]),
        password: new FormControl('', Validators.required),
        csrf: new FormControl('', Validators.required),
      })
    : new UntypedFormGroup({
        userId: new UntypedFormControl('', [
          Validators.required,
          CustomFormValidators.emailValidator,
        ]),
        password: new UntypedFormControl('', Validators.required),
      });

  login(nativeForm?: HTMLFormElement) {
    if (this.isNewAuthFlow && nativeForm) {
      const csrf =
        [...nativeForm.elements]
          .find((element) => element.hasAttribute?.('data-csrf'))
          ?.getAttribute?.('data-csrf') ?? '';
      this.form.get('csrf')?.setValue(csrf);

      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

      nativeForm.submit();
      this.busy$.next(true);
    } else {
      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }

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

  protected onSuccess(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      // We want to remove error messages on successful login (primary the bad
      // username/password combination)
      this.globalMessage.remove(GlobalMessageType.MSG_TYPE_ERROR);
      this.form.reset();
    }

    this.busy$.next(false);
  }
}
