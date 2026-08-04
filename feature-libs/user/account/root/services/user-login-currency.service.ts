/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  CurrencyService,
  EventService,
  LoginEvent,
  LogoutEvent,
  User,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { UserAccountConfig } from '../config/user-account-config';
import { UserAccountFacade } from '../facade/user-account.facade';
import { UserLoginCurrencyPersistenceService } from './user-login-currency-persistence.service';

export const PRE_LOGIN_CURRENCY_STORAGE_KEY = 'spartacus⚿⚿pre-login-currency';

@Injectable({
  providedIn: 'root',
})
export class UserLoginCurrencyService implements OnDestroy {
  protected eventService = inject(EventService);
  protected currencyService = inject(CurrencyService);
  protected userAccountFacade = inject(UserAccountFacade);
  protected userAccountConfig = inject(UserAccountConfig);
  protected currencyPersistence = inject(UserLoginCurrencyPersistenceService);

  protected subscription = new Subscription();

  constructor() {
    this.onLoginAndLogout();
  }

  protected onLoginAndLogout(): void {
    if (!this.userAccountConfig.userAccount?.applyUserCurrencyOnLogin) {
      return;
    }

    this.subscription.add(
      this.eventService
        .get(LoginEvent)
        .pipe(
          switchMap(() => this.currencyService.getActive().pipe(take(1))),
          switchMap((preLoginCurrency) => {
            this.currencyPersistence.savePreLoginCurrency(preLoginCurrency);
            return this.userAccountFacade.get().pipe(
              filter(
                (user): user is User =>
                  !!user?.currency?.isocode &&
                  user.currency.isocode !== preLoginCurrency
              ),
              map((user) => user?.currency?.isocode as string),
              take(1)
            );
          })
        )
        .subscribe((isocode) => {
          this.currencyService.setActive(isocode);
        })
    );

    this.subscription.add(
      this.eventService.get(LogoutEvent).pipe(
        switchMap(() => this.currencyService.getActive().pipe(take(1)))
      ).subscribe((activeCurrency) => {
        const isocode = this.currencyPersistence.getPreLoginCurrency();
        if (isocode && isocode !== activeCurrency) {
          this.currencyService.setActive(isocode);
        }
        this.currencyPersistence.clearPreLoginCurrency();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
