/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthConfigService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { ForgotPasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';

@Injectable()
export class CDCForgotPasswordComponentService
  extends ForgotPasswordComponentService
  implements OnDestroy
{
  protected subscription = new Subscription();

  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected authConfigService: AuthConfigService,
    protected globalMessage: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {
    super(
      userPasswordService,
      routingService,
      authConfigService,
      globalMessage
    );
  }

  /**
   * Sends an email to through CDC SDK to reset the password.
   */
  requestEmail() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          // Reset password using CDC Gigya SDK
          this.cdcJsService
            .resetPasswordWithoutScreenSet(this.form.value.userEmail)
            .subscribe({
              next: (response) => {
                this.busy$.next(false);
                if (response.status === 'OK') {
                  this.onSuccess();
                }
              },
              error: () => this.busy$.next(false),
            });
        } else {
          this.busy$.next(false);
          // CDC Gigya SDK not loaded, show error to the user
          this.globalMessage.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
