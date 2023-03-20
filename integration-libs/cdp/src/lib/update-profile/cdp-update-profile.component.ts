/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { //FormControl,
  UntypedFormGroup,
  //Validators
} from '@angular/forms';
import { UpdateProfileComponent, UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { CDPUpdateProfileService } from './cdp-update-profile.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//import { CustomFormValidators } from '@spartacus/storefront';


@Component({
  selector: 'cx-cdp-update-profile',
  templateUrl: './cdp-update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class CDPUpdateProfileComponent extends UpdateProfileComponent implements OnInit, OnDestroy{

  constructor(
    protected cdpUpdateProfileService: CDPUpdateProfileService,
    protected updateProfileComponentService: UpdateProfileComponentService
    ) {
    super(updateProfileComponentService);
  }

  form: UntypedFormGroup = this.cdpUpdateProfileService.form;
  subscription: Subscription;

  isUpdating$ = this.cdpUpdateProfileService.isUpdating$;

  onSubmit(): void {
    this.cdpUpdateProfileService.updateProfile();
  }

  ngOnInit(): void {
    /*const email = <FormControl>this.form.get('email');
    const confirmEmail = <FormControl>this.form.get('confirmEmail');
    const password = <FormControl>this.form.get('password');

    this.subscription = email.valueChanges.subscribe(value => {
      if (value) {
        confirmEmail.setValidators([Validators.required,
         // CustomFormValidators.emailsMustMatch('email', 'confirmEmail')
        ]);
        password.setValidators([Validators.required, ]);
      }
      else {
        email.setValidators([Validators.required, ]);
      }

    });*/
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
