/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  EventService,
} from '@spartacus/core';
import { catchError, of } from 'rxjs';
import { GetSubscriptionByCodeReloadEvent } from '@spartacus/subscription-billing/root';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionActionsModalComponentService {
  private globalMessageService = inject(GlobalMessageService);
  private eventService = inject(EventService);

  handleError(
    onDialogClose?: (reason: string) => void,
    errorMessageKey = 'subscriptionActions.unknownError'
  ) {
    return catchError(() => {
      if (onDialogClose) {
        onDialogClose('error');
      }

      this.globalMessageService.add(
        { key: errorMessageKey },
        GlobalMessageType.MSG_TYPE_ERROR
      );

      return of(undefined); // complete observable gracefully
    });
  }

  handleSuccess(
    messageKey: string,
    onDialogClose?: (reason: string) => void,
    dispatchReloadEvent = true
  ) {
    return {
      next: () => {
        if (onDialogClose) {
          onDialogClose('Success');
        }
        if (dispatchReloadEvent) {
          this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
        }
        this.globalMessageService.add(
          { key: messageKey },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
    };
  }
  onError(): void {
    this.globalMessageService.add(
      { key: 'subscriptionActions.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
