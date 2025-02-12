/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Country,
  GlobalMessageService,
  Region,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  VerificationToken,
  VerificationTokenCreation,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { ONE_TIME_PASSWORD_REGISTRATION_PURPOSE } from '../user-registration-constants';
import { UserRegistrationFormService } from '../form';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-otp-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserRegistrationOTPFormComponent {
  protected routingService = inject(RoutingService);
  protected verificationTokenFacade = inject(VerificationTokenFacade);
  protected winRef = inject(WindowRef);
  protected globalMessageService = inject(GlobalMessageService, {
    optional: true,
  });
  protected userRegistrationFormService = inject(UserRegistrationFormService);
  protected busy$ = new BehaviorSubject(false);
  titles$: Observable<Title[]> = this.userRegistrationFormService.getTitles();

  countries$: Observable<Country[]> =
    this.userRegistrationFormService.getCountries();

  regions$: Observable<Region[]> =
    this.userRegistrationFormService.getRegions();

  registerForm: FormGroup = this.userRegistrationFormService.form;

  isLoading$ = new BehaviorSubject(false);

  onSubmit(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    const tokenCreationReqBody = this.collectDataFromRegistrationForm();
    this.verificationTokenFacade
      .createVerificationToken(tokenCreationReqBody)
      .subscribe({
        next: (result: VerificationToken) =>
          this.goToVerificationTokenForm(result),
        error: (error: HttpErrorResponse) => {
          this.routingService.go(
            {
              cxRoute: 'verifyTokenForRegistration',
            },
            {
              state: {
                registrationDataForm: this.registerForm.value,
                loginId: this.registerForm.value.email.toLowerCase(),
                errorStatus: error.status,
                form: this.registerForm.value,
              },
            }
          );
          this.busy$.next(false);
        },
        complete: () => this.onCreateVerificationTokenComplete(),
      });
  }

  protected goToVerificationTokenForm(
    verificationToken: VerificationToken
  ): void {
    this.routingService.go(
      {
        cxRoute: 'verifyTokenForRegistration',
      },
      {
        state: {
          registrationDataForm: this.registerForm.value,
          loginId: this.registerForm.value.email.toLowerCase(),
          tokenId: verificationToken.tokenId,
          expiresIn: verificationToken.expiresIn,
        },
      }
    );
  }

  protected collectDataFromRegistrationForm(): VerificationTokenCreation {
    return {
      loginId: this.registerForm.value.email.toLowerCase(),
      purpose: ONE_TIME_PASSWORD_REGISTRATION_PURPOSE,
    };
  }

  protected onCreateVerificationTokenComplete(): void {
    this.registerForm.reset();
    this.busy$.next(false);
  }
}
