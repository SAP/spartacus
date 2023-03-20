/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import {
  UserProfileFacade,
  UserEmailFacade,
} from '@spartacus/user/profile/root';
import { CDPUpdateProfileService } from 'integration-libs/cdp/src/lib/update-profile/cdp-update-profile.service';
import { CdcJsService } from '../../root/service';

@Injectable({
  providedIn: 'root',
})
export class CdcCdpUpdateProfileService extends CDPUpdateProfileService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected userEmail: UserEmailFacade,
    protected globalMessageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {
    super(userProfile, userEmail, globalMessageService);
  }
  updateBasicProfile(): void {
    const formValue = this.form.value;
    this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  updateEmailAddress(): void {
    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;

    this.cdcJsService
      .updateUserEmailWithoutScreenSet(password, newEmail)
      .subscribe({
        next: () => this.onSuccess(),
        error: (error: Error) => this.onError(error),
      });
  }
}
