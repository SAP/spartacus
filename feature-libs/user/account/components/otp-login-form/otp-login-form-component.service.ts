/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class OTPLoginFormComponentService {
  constructor(
    protected auth: AuthService,
    protected globalMessage: GlobalMessageService,
    protected winRef: WindowRef
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => {
      state === true ? this.form.disable() : this.form.enable();
    })
  );

  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl('', [Validators.required]),
    tokenCode: new UntypedFormControl('', Validators.required),
  });

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    debugger;
    this.busy$.next(true);

    from(
      this.auth.loginWithCredentials(
        this.form.value.tokenId,
        this.form.value.tokenCode
      )
    )
      .pipe(
        withLatestFrom(this.auth.isUserLoggedIn()),
        tap(([_, isLoggedIn]) => this.onSuccess(isLoggedIn))
      )
      .subscribe();
  }

  displayMessage(target: string) {
    this.globalMessage.add(
      {
        key: 'otpLoginForm.sentOTP',
        params: { target },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      10000
    );
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
