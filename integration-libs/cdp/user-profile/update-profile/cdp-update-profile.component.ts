/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UntypedFormGroup } from '@angular/forms';
import {
  UpdateProfileComponent,
  UpdateProfileComponentService,
} from '@spartacus/user/profile/components';
import { CDPUpdateProfileService } from './cdp-update-profile.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-cdp-update-profile',
  templateUrl: './cdp-update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class CDPUpdateProfileComponent extends UpdateProfileComponent {
  constructor(
    protected cdpUpdateProfileService: CDPUpdateProfileService,
    protected updateProfileComponentService: UpdateProfileComponentService
  ) {
    super(updateProfileComponentService);
  }

  form: UntypedFormGroup = this.cdpUpdateProfileService.form;

  isUpdating$ = this.cdpUpdateProfileService.isUpdating$;

  onSubmit(): void {
    this.cdpUpdateProfileService.updateProfile();
  }
  onEmailChanged(): void {
    this.cdpUpdateProfileService.updateFormValidators();
  }
}
