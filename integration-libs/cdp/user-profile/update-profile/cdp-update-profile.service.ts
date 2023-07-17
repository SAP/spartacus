/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { User } from '@spartacus/user/account/root';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import {
  UserEmailFacade,
  UserProfileFacade,
} from '@spartacus/user/profile/root';

@Injectable()
export class CDPUpdateProfileService extends UpdateProfileComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected userEmail: UserEmailFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService
  ) {
    super(userProfile, globalMessageService);
  }

  form: UntypedFormGroup = new UntypedFormGroup(
    {
      customerId: new UntypedFormControl(''),
      titleCode: new UntypedFormControl(''),
      firstName: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      uid: new UntypedFormControl(''), //current email address
      newEmail: new UntypedFormControl(''),
      confirmEmail: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    },
    {
      validators: CustomFormValidators.emailsMustMatch(
        'newEmail',
        'confirmEmail'
      ),
    }
  );

  updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy$.next(true);
    this.updateBasicProfile();
  }

  updateBasicProfile(): void {
    var currentUser: User = this.form.value;
    this.userProfile.update(currentUser).subscribe({
      next: () => {
        this.updateEmailAddress();
        this.onSuccess();
      },
      error: (error: Error) => this.onError(error),
    });
  }

  updateEmailAddress(): void {
    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;
    if (newEmail) {
      this.userEmail.update(password, newEmail).subscribe({
        next: () => this.onSuccessfulEmailUpdate(newEmail),
        error: (error: Error) => this.onError(error),
      });
    }
  }

  onSuccessfulEmailUpdate(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();

    this.authRedirectService.setRedirectUrl(
      this.routingService.getUrl({ cxRoute: 'home' })
    );

    this.authService.coreLogout().then(() => {
      this.routingService.go(
        { cxRoute: 'login' },
        {
          state: {
            newUid,
          },
        }
      );
    });
  }

  updateFormValidators(): void {
    if (
      this.form.get('newEmail')?.value ||
      this.form.get('confirmEmail')?.value ||
      this.form.get('password')?.value
    ) {
      // Either all 3 fields (newEmail, confirmEmail, password) should be filled or all 3 should be empty.
      // newEmail should match be in standard email format

      this.form.controls['newEmail']?.setValidators([
        Validators.required,
        CustomFormValidators.emailValidator,
      ]);
      this.form.controls['newEmail']?.updateValueAndValidity();
      this.form.controls['password']?.setValidators([Validators.required]);
      this.form.controls['password']?.updateValueAndValidity();
      this.form.controls['confirmEmail']?.setValidators([Validators.required]);
      this.form.controls['confirmEmail']?.updateValueAndValidity();
    } else {
      this.form.controls['newEmail']?.clearValidators();
      this.form.controls['newEmail']?.updateValueAndValidity();
      this.form.controls['confirmEmail']?.clearValidators();
      this.form.controls['confirmEmail']?.updateValueAndValidity();
      this.form.controls['password']?.clearValidators();
      this.form.controls['password']?.updateValueAndValidity();
    }
  }
}
