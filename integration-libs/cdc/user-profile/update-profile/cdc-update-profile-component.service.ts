/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  USE_MY_ACCOUNT_V2_PROFILE,
  UpdateProfileComponentService,
} from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Subject } from 'rxjs';

@Injectable()
export class CDCUpdateProfileComponentService extends UpdateProfileComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {
    super(userProfile, globalMessageService);
  }

  updateSucceed$ = new Subject<boolean>();
  enableMyAccountV2 = inject(USE_MY_ACCOUNT_V2_PROFILE);

  /**
   * Updates the user's details and handles the UI.
   */
  updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const formValue = this.form.value;
    this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  protected onError(_error: any): void {
    const errorMessage = _error?.errorMessage || ' ';
    this.globalMessageService.add(
      errorMessage,
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.busy$.next(false);
    if (this.enableMyAccountV2) {
      this.updateSucceed$.next(false);
    }
  }

  protected onSuccess(): void {
    super.onSuccess();
    if (this.enableMyAccountV2) {
      this.updateSucceed$.next(true);
    }
  }
}
