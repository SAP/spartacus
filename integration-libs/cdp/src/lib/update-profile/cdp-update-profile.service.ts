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
import { GlobalMessageService } from '@spartacus/core';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserEmailFacade, UserProfileFacade } from '@spartacus/user/profile/root';
import { environment } from 'projects/storefrontapp/src/environments/environment.prod';

@Injectable()
export class CdpUpdateProfileService extends UpdateProfileComponentService{
  constructor(protected userProfile: UserProfileFacade,
    protected userEmail: UserEmailFacade,
    protected globalMessageService: GlobalMessageService,) {
      super(userProfile,globalMessageService);
    }

  form: UntypedFormGroup = new UntypedFormGroup({
    customerId: new UntypedFormControl(''),
    titleCode: new UntypedFormControl(''),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl(''),
  });
   oldEmail: string;

   updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    if(!(environment.cdc))
    {
        //update other user details
        // this.userProfile.update(this.form.value).subscribe({
        //     next: () => this.onSuccess(),
        //     error: (error: Error) => this.onError(error),
        //   });

          const newEmail = this.form.get('email')?.value;
          // const password = this.form.get('password')?.value;
          const y = this.form.get('email');
          console.log(y);
          const x = y?.value;
          console.log("x"+ x);
          //update email information
         if(this.oldEmail!== newEmail)
        {
           console.log(newEmail);
           console.log(this.oldEmail);
          // this.userEmail.update(password, newEmail).subscribe({
          //   next: () => this.onSuccess(),
          //   error: (error: Error) => this.onError(error),
          // });
        }
        else{
           console.log(newEmail);
           console.log(this.oldEmail);
        }

    }
  }

}
