/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';

@Component({
  selector: 'cx-my-account-v2-profile',
  templateUrl: './my-account-v2-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountV2ProfileComponent implements OnInit {
  protected service = inject(UpdateProfileComponentService);
  ngOnInit(): void {
    this.isEditing = false;
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;
  user$: Observable<User> = this.service.user$;
  isEditing: boolean;
  originalEditValue: User;

  onSubmit(): void {
    this.service.updateProfile();
    this.service.updateSucceed$.subscribe((res) => {
      this.isEditing = !res;
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.form.setValue(this.originalEditValue);
  }

  onEdit(): void {
    this.isEditing = true;
    this.originalEditValue = this.form.value;
  }
}
