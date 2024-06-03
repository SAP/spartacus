/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UpdatePasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdatePasswordComponentService extends UpdatePasswordComponentService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authRedirectService: AuthRedirectService,
    protected authService: AuthService,
    protected cdcJsService: CdcJsService
  ) {
    super(
      userPasswordService,
      routingService,
      globalMessageService,
      authRedirectService,
      authService
    );
  }

  /**
   * Updates the password for the user.
   */
  updatePassword(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;

    this.cdcJsService
      .updateUserPasswordWithoutScreenSet(oldPassword, newPassword)
      .subscribe({
        next: () => this.onSuccess(),
        error: (error) => this.onError(error),
      });
  }

  protected onError(_error: any): void {
    const errorMessage = _error?.errorDetails || ' ';
    this.globalMessageService.add(
      errorMessage,
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.busy$.next(false);
  }
}
