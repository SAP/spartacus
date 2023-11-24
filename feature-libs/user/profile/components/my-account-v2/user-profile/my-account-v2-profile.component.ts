/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { MyAccountV2ProfileComponentService } from './my-account-v2-profile-component.service';

@Component({
  selector: 'cx-my-new-account-v2-profile',
  templateUrl: './my-account-v2-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {},
})
export class MyAccountV2ProfileComponent implements OnInit {
  constructor(protected service: MyAccountV2ProfileComponentService) {}
  ngOnInit(): void {
    this.isEditing = false;
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;
  user$: Observable<User> = this.service.user$;
  isEditing: boolean;

  onSubmit(): void {
    this.service.updateProfile();
    this.service.updateSucceed$.subscribe((res) => {
      this.isEditing = !res;
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  onEdit(): void {
    this.isEditing = true;
  }
}
