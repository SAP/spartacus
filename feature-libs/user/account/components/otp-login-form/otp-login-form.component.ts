/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  RoutingService,
  TranslatePipe,
  UrlPipe,
  WindowRef,
} from '@spartacus/core';
import {
  CustomFormValidators,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  VerificationToken,
  VerificationTokenCreation,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  ONE_TIME_PASSWORD_LOGIN_PURPOSE,
  OTP_LOGIN_STATE_STORAGE_KEY,
} from '../user-account-constants';

@Component({
  selector: 'cx-otp-login-form',
  templateUrl: './otp-login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    PasswordVisibilityToggleDirective,
    RouterLink,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class OneTimePasswordLoginFormComponent implements OnInit {
  protected routingService = inject(RoutingService);
  protected verificationTokenFacade = inject(VerificationTokenFacade);
  protected winRef = inject(WindowRef);

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

  ngOnInit(): void {
    const sessionState = this.getStoredLoginState();
    if (sessionState) {
      this.form.patchValue({
        userId: sessionState.loginId,
      });
    }
    this.clearStoredLoginState();
  }

  protected getStoredLoginState(): { loginId: string } | null {
    const stored = this.winRef.sessionStorage?.getItem(
      OTP_LOGIN_STATE_STORAGE_KEY
    );
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  protected clearStoredLoginState(): void {
    this.winRef.sessionStorage?.removeItem(OTP_LOGIN_STATE_STORAGE_KEY);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    const verificationTokenCreation = this.collectDataFromLoginForm();
    this.verificationTokenFacade
      .createVerificationToken(verificationTokenCreation)
      .subscribe({
        next: (result: VerificationToken) =>
          this.goToVerificationTokenForm(result, verificationTokenCreation),
        error: (error: HttpErrorResponse) => {
          this.routingService.go(
            {
              cxRoute: 'verifyToken',
            },
            {
              state: {
                loginId: verificationTokenCreation.loginId,
                password: verificationTokenCreation.password,
                errorStatus: error.status,
              },
            }
          );
          this.busy$.next(false);
        },
        complete: () => this.onCreateVerificationTokenComplete(),
      });
  }

  protected goToVerificationTokenForm(
    verificationToken: VerificationToken,
    verificationTokenCreation: VerificationTokenCreation
  ): void {
    this.routingService.go(
      {
        cxRoute: 'verifyToken',
      },
      {
        state: {
          loginId: verificationTokenCreation.loginId,
          password: verificationTokenCreation.password,
          tokenId: verificationToken.tokenId,
          expiresIn: verificationToken.expiresIn,
        },
      }
    );
  }

  protected onCreateVerificationTokenComplete(): void {
    this.form.reset();
    this.busy$.next(false);
  }

  protected collectDataFromLoginForm(): VerificationTokenCreation {
    return {
      // TODO: consider dropping toLowerCase as this should not be part of the UI,
      // as it's too opinionated and doesn't work with other AUTH services
      loginId: this.form.value.userId.toLowerCase(),
      password: this.form.value.password,
      purpose: ONE_TIME_PASSWORD_LOGIN_PURPOSE,
    };
  }
}
