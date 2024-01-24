/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  USE_MY_ACCOUNT_V2_EMAIL,
  UpdateEmailComponentService,
} from '@spartacus/user/profile/components';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { Subject } from 'rxjs';

@Injectable()
export class CDCUpdateEmailComponentService extends UpdateEmailComponentService {
  updateSucceed$ = new Subject();
  enableMyAccountV2 = inject(USE_MY_ACCOUNT_V2_EMAIL);
  constructor(
    protected userEmail: UserEmailFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected cdcJsService: CdcJsService
  ) {
    super(
      userEmail,
      routingService,
      globalMessageService,
      authService,
      authRedirectService
    );
    if (this.enableMyAccountV2) {
      this.form.addControl('oldEmail', new UntypedFormControl(''));
    }
  }

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;

    this.cdcJsService
      .updateUserEmailWithoutScreenSet(password, newEmail)
      .subscribe({
        next: () => this.onSuccess(newEmail),
        error: (error: Error) => this.onError(error),
      });
  }

  /**
   * Handles successful updating of the user email.
   */
  protected onSuccess(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();
    if (this.enableMyAccountV2) {
      this.updateSucceed$.next(true);
    }
    // sets the redirect url after login
    this.authRedirectService.setRedirectUrl(
      this.routingService.getUrl({ cxRoute: 'home' })
    );
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout().then(() => {
      this.routingService.go(
        { cxRoute: 'login' },
        {
          state: {
            newUid,
          },
        }
      );
    });
  }

  protected onError(_error: Error): void {
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
    this.globalMessageService.add(
      { key: 'httpHandlers.validationErrors.invalid.password' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.busy$.next(false);
    if (this.enableMyAccountV2) {
      this.updateSucceed$.next(false);
    }
  }
}
