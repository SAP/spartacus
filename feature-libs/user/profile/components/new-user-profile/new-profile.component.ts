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
import { NewProfileComponentService } from './new-profile-component.service';

@Component({
  selector: 'cx-new-profile',
  templateUrl: './new-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { },
})
export class NewProfileComponent implements OnInit{
  constructor(protected service: NewProfileComponentService) {}
  ngOnInit(): void {
    this.isEditingProfile = false;
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;
  user$: Observable<User> = this.service.user$;
  busy$ = this.service.busy$;
  isEditingProfile: boolean;

  onSubmit(): void {
    this.isEditingProfile = true;
    this.service.updateProfile();
  }
  cancelEdit():  void {
    this.isEditingProfile = false;
  }

  onEdit(): void {
    this.isEditingProfile = true;
  }

}
