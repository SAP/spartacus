/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { NewProfileComponentService } from './new-profile-component.service';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './new-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class NewProfileComponent {
  constructor(protected service: NewProfileComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;

  onSubmit(): void {
    this.service.updateProfile();
  }
}
