/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { VerificationTokenFacade } from '../../root/facade/verification-token.facade';
import { LoginForm, VerificationToken } from '../../root/model';
import { ONE_TIME_PASSWORD_LOGIN_PURPOSE } from './use-otp-login-form';

@Component({
  selector: 'cx-verification-token-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneTimePasswordLoginFormComponent {
  constructor(
    protected routingService: RoutingService,
    protected verificationTokenFacade: VerificationTokenFacade,
    protected winRef: WindowRef,
    protected translationService: TranslationService,
    protected globalMessage: GlobalMessageService
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$: Observable<boolean> = this.busy$.pipe(
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

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    const loginForm = this.collectDataFromLoginForm();
    this.verificationTokenFacade.createVerificationToken(loginForm).subscribe({
      next: (result: VerificationToken) =>
        this.goToVerificationTokenForm(result, loginForm),
      error: (error: HttpErrorModel) =>
        this.onCreateVerificationTokenFail(error),
      complete: () => this.busy$.next(false),
    });
  }

  protected onCreateVerificationTokenFail(error: HttpErrorModel): void {
    this.busy$.next(false);
    const errorDetails = error.details ?? [];
    if (errorDetails.length === 0) {
      this.globalMessage.add(
        { key: 'httpHandlers.unknownError' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
    errorDetails.forEach((err) => {
      this.globalMessage.add(
        { raw: err.message },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  }

  protected goToVerificationTokenForm(
    verificationToken: VerificationToken,
    loginForm: LoginForm
  ): void {
    this.routingService.go({
      cxRoute: 'verifyToken',
      params: {
        loginId: loginForm.loginId,
        password: loginForm.password,
        tokenId: verificationToken.tokenId,
      },
    });
  }

  protected collectDataFromLoginForm(): LoginForm {
    return {
      // TODO: consider dropping toLowerCase as this should not be part of the UI,
      // as it's too opinionated and doesn't work with other AUTH services
      loginId: this.form.value.userId.toLowerCase(),
      password: this.form.value.password,
      purpose: ONE_TIME_PASSWORD_LOGIN_PURPOSE,
    };
  }
}
