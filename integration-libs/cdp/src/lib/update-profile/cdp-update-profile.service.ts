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
import { AuthRedirectService, AuthService, GlobalMessageService, GlobalMessageType, RoutingService } from '@spartacus/core';
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

  form: UntypedFormGroup = new UntypedFormGroup({
    customerId: new UntypedFormControl(''),
    titleCode: new UntypedFormControl(''),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl(''),
    newEmail: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    confirmEmail: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy$.next(true);

    this.updateBasicProfile();
    this.updateEmailAddress();
  }

  updateBasicProfile(): void {
   var currentUser: User = {};
    currentUser.customerId = this.form.get('customerId')?.value;
    currentUser.titleCode = this.form.get('titleCode')?.value;
    currentUser.firstName = this.form.get('firstName')?.value;
    currentUser.lastName = this.form.get('lastName')?.value;
    //var currentUser: User =  this.form.value;
    this.userProfile.update(currentUser).subscribe({
      next: () => this.onSuccess(),
      error: (error: Error) => this.onError(error),
    });
  }

  updateEmailAddress(): void {
      const newEmail = this.form.get('confirmEmail')?.value;

      const password = this.form.get('password')?.value;

      this.userEmail.update(password, newEmail).subscribe({
        next: () => this.onSuccessfulEmailUpdate(newEmail),
        error: (error: Error) => this.onError(error),
      });
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


}
