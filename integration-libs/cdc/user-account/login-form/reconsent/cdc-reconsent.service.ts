/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';
import { CdcJsService, CdcUserConsentService } from '@spartacus/cdc/root';

@Injectable({ providedIn: 'root' })
export class CdcReconsentService implements OnDestroy {
  constructor(
    protected cdcUserConsentService: CdcUserConsentService,
    protected cdcJsService: CdcJsService,
    protected globalMessageService: GlobalMessageService,
    protected launchDialogService: LaunchDialogService
  ) {}
  protected subscription: Subscription = new Subscription();

  /**
   * saves the consent given from reconsent pop-up
   * @param consentId - array of consent IDs
   * @param userParams - data from login session
   * @returns error message if any
   */
  saveReconsent(consentId: string[], userParams: any): string {
    let errorMessage: string = '';
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          consentId.forEach((consentTemplateId) => {
            this.cdcUserConsentService
              .updateCdcConsent(
                true,
                consentTemplateId,
                userParams?.user,
                userParams?.regToken
              )
              .subscribe({
                next: (result) => {
                  if (result?.errorCode !== 0) {
                    this.handleReconsentUpdateError(result?.errorMessage);
                  } else {
                    this.reLogin(userParams.user, userParams.password);
                  }
                },
                error: (error) => {
                  this.handleReconsentUpdateError(error?.message);
                },
              });
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
    return errorMessage;
  }

  /**
   * Trigger Login into CDC
   * @param userId - user id
   * @param password - password
   */
  reLogin(userId: string, password: string): void {
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          // Logging in using CDC Gigya SDK
          this.cdcJsService
            .loginUserWithoutScreenSet(userId, password)
            .subscribe({
              next: (response) => {
                if (response?.status === 'OK') {
                  this.launchDialogService.closeDialog(
                    'Login completed successfully'
                  );
                } else {
                  this.launchDialogService.closeDialog('Error During Relogin');
                }
              },
              error: () => {
                //error message already raised in loginUserWithoutScreenSet service
                this.launchDialogService.closeDialog('Error During Relogin');
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
   *
   * @param message error message to be displayed after closing reconsent pop up
   */
  handleReconsentUpdateError(message: string) {
    this.launchDialogService.closeDialog('Error During Reconsent Update');
    const response = {
      status: 'FAIL',
      errorMessage: message,
    };
    this.cdcJsService.handleLoginError(response);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
