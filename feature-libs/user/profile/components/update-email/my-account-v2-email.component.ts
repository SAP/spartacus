/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyAccountV2EmailComponentService } from './my-account-v2-email-component.service';
import { GlobalMessageType, User } from '@spartacus/core';

import { UserProfileFacade } from '@spartacus/user/profile/root';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-my-new-account-v2-email',
  templateUrl: './my-account-v2-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {},
})
export class MyAccountV2EmailComponent implements OnInit {
  form: UntypedFormGroup = this.emailComponentservice.form;
  isUpdating$: Observable<boolean> = this.emailComponentservice.isUpdating$;
  isEditing: boolean;
  showingAlert: boolean;

  user$ = this.userProfile
    .get()
    .pipe(filter((user): user is User => Boolean(user)));
  globalMessageType = GlobalMessageType;

  constructor(
    protected emailComponentservice: MyAccountV2EmailComponentService,
    protected userProfile: UserProfileFacade
  ) {}
  ngOnInit(): void {
    this.isEditing = false;
  }
  onSubmit(): void {
    this.emailComponentservice.save();
    this.emailComponentservice.updateSucceed$.subscribe((res) => {
      this.isEditing = !res;
    });
  }

  onEdit(): void {
    this.isEditing = true;
    this.showingAlert = true;
    this.form.reset();
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  closeDialogConfirmationAlert() {
    this.showingAlert = false;
  }
}
