/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { VerificationTokenFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

const globalMsgShowTime: number = 10000;
@Injectable()
export class VerificationTokenFormComponentService {
  constructor() {}
  protected globalMessage: GlobalMessageService = inject(GlobalMessageService);
  protected verificationTokenFacade: VerificationTokenFacade = inject(
    VerificationTokenFacade
  );
  protected auth: AuthService = inject(AuthService);
  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => {
      state === true ? this.form.disable() : this.form.enable();
    })
  );

  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl('', [Validators.required]),
    tokenCode: new UntypedFormControl('', [Validators.required]),
  });

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy$.next(true);

    from(
      this.auth.otpLoginWithCredentials(
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
        key: 'verificationTokenForm.createVerificationToken',
        params: { target },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      globalMsgShowTime
    );
  }

  createVerificationToken(loginId: string, password: string, purpose: string) {
    return this.verificationTokenFacade.createVerificationToken({
      loginId,
      password,
      purpose,
    });
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
