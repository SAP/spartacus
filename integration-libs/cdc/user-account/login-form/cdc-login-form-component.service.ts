/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { Subscription } from 'rxjs';

@Injectable()
export class CdcLoginFormComponentService
  extends LoginFormComponentService
  implements OnDestroy
{
  constructor(
    protected auth: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected winRef: WindowRef,
    protected cdcJsService: CdcJsService
  ) {
    super(auth, globalMessageService, winRef);
  }

  protected subscription: Subscription = new Subscription();

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          // Logging in using CDC Gigya SDK
          this.cdcJsService
            .loginUserWithoutScreenSet(
              this.form.value.userId.toLowerCase(),
              this.form.value.password
            )
            .subscribe({
              next: () => this.busy$.next(false),
              error: () => this.busy$.next(false),
            });
        } else {
          // CDC Gigya SDK not loaded, show error to the user
          this.globalMessageService.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.busy$.next(false);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
