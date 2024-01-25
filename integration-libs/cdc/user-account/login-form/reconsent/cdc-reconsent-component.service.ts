/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';
import { CdcJsService, CdcUserConsentService } from '@spartacus/cdc/root';

@Injectable({ providedIn: 'root' })
export class CdcReconsentComponentService implements OnDestroy {
  constructor(
    protected cdcUserConsentService: CdcUserConsentService,
    protected cdcJsService: CdcJsService,
    protected globalMessageService: GlobalMessageService,
    protected launchDialogService: LaunchDialogService
  ) {}
  protected subscription: Subscription = new Subscription();

  /**
   * saves the consent given from reconsent pop-up and triggers a re-login
   * @param consentId - array of consent IDs
   * @param userParams - data from login session
   */
  saveConsentAndLogin(consentId: string[], userParams: any) {
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          this.cdcUserConsentService
            .updateCdcConsent(
              true,
              consentId,
              userParams?.user,
              userParams?.regToken
            )
            .subscribe({
              next: (result) => {
                if (result?.errorCode === 0) {
                  //do a automatic re-login
                  this.cdcJsService
                    .loginUserWithoutScreenSet(
                      userParams.user,
                      userParams.password
                    )
                    .subscribe(() => {
                      this.launchDialogService.closeDialog('relogin triggered');
                    });
                }
              },
              error: (error) => {
                this.handleReconsentUpdateError(
                  'Reconsent Error',
                  error?.message
                );
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
        }
      })
    );
  }

  /**
   * Displays error message after closing reconsent dialog
   */
  handleReconsentUpdateError(reason?: string, errorMessage?: string) {
    this.launchDialogService.closeDialog(reason);
    if (errorMessage) {
      this.globalMessageService.add(
        {
          key: 'httpHandlers.badRequestPleaseLoginAgain',
          params: {
            errorMessage: errorMessage,
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
