/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  CurrencySetEvent,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { UserAccountConfig } from '@spartacus/user/account/root';
import { Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { UserProfileFacade } from '../facade/user-profile.facade';

@Injectable({
  providedIn: 'root',
})
export class UserCurrencyPreferenceSaverService implements OnDestroy {
  protected eventService = inject(EventService);
  protected userProfileFacade = inject(UserProfileFacade);
  protected userIdService = inject(UserIdService);
  protected userAccountConfig = inject(UserAccountConfig);

  protected subscription = new Subscription();

  constructor() {
    this.onCurrencyChange();
  }

  protected onCurrencyChange(): void {
    if (!this.userAccountConfig.userAccount?.applyUserCurrencyOnLogin) {
      return;
    }

    this.subscription.add(
      this.eventService
        .get(CurrencySetEvent)
        .pipe(
          switchMap(({ activeCurrency }) =>
            this.userIdService.getUserId().pipe(
              take(1),
              filter((userId) => userId !== OCC_USER_ID_ANONYMOUS),
              switchMap(() =>
                this.userProfileFacade.update({
                  currency: { isocode: activeCurrency },
                })
              )
            )
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
