/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class UpdateProfileComponent {
  constructor(protected service: UpdateProfileComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;

  onSubmit(): void {
    this.service.updateProfile();
  }
}
