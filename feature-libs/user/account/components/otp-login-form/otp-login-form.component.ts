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
import { ONE_TIME_PASSWORD_LOGIN_PURPOSE } from '../user-account-constants';

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
    const state = this.winRef.nativeWindow?.history?.state;
    if (state?.['loginId'] || state?.['password']) {
      this.form.patchValue({
        userId: state['loginId'] ?? '',
        password: state['password'] ?? '',
      });
      this.winRef.nativeWindow?.history?.replaceState(
        { loginId: '', password: '' },
        ''
      );
    }
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
