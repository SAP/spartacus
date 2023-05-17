/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { CdcJsService } from '../../root/service';
import { Subscription } from 'rxjs';
import { CdcReconsentService } from '../reconsent/cdc-reconsent.service';

@Injectable()
export class CdcLoginFormComponentService
  extends LoginFormComponentService
  implements OnDestroy
{
  constructor(
    protected auth: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected winRef: WindowRef,
    protected cdcJsService: CdcJsService,
    protected cdcReconsentService: CdcReconsentService
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
              error: (errorResponse) => {
                if (errorResponse.errorCode === 206001) {
                  this.cdcJsService.raiseCdcReconsentEvent(
                    this.form.value.userId.toLowerCase(),
                    errorResponse.missingRequiedFields,
                    errorResponse.errorMessage
                  );
                }
                this.busy$.next(false);
              },
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
