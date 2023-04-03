/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  RoutingService,
} from '@spartacus/core';
import {
  UserProfileFacade,
  UserEmailFacade,
} from '@spartacus/user/profile/root';
import { CdcJsService } from '@spartacus/cdc/root';
import { CDPUpdateProfileService } from '@spartacus/cdp/user-profile';

@Injectable({
  providedIn: 'root',
})
export class CdcCdpUpdateProfileService extends CDPUpdateProfileService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected userEmail: UserEmailFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected cdcJsService: CdcJsService
  ) {
    super(
      userProfile,
      userEmail,
      routingService,
      globalMessageService,
      authService,
      authRedirectService
    );
  }
  updateBasicProfile(): void {
    const formValue = this.form.value;
    this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
      next: () => {
        this.updateEmailAddress();
        this.onSuccess();
      },
      error: (error) => this.onError(error),
    });
  }

  updateEmailAddress(): void {
    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;
    if (newEmail) {
      this.cdcJsService
        .updateUserEmailWithoutScreenSet(password, newEmail)
        .subscribe({
          next: () => this.onSuccessfulEmailUpdate(newEmail),
          error: (error: Error) => this.onError(error),
        });
    }
  }
}
