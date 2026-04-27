/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  AuthService,
  CurrencyService,
  CurrencySetEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  isNotNullable,
  LoginEvent,
  LogoutEvent,
  WindowRef,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

const CURRENCY_STORAGE_KEY = 'spartacus⚿⚿currency';

/**
 * User account event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class UserAccountEventListener implements OnDestroy {
  protected subscriptions = new Subscription();
  protected anonymousCurrencyStorageValue?: string | null;

  constructor(
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService,
    protected userAccountFacade: UserAccountFacade,
    protected currencyService: CurrencyService,
    protected authService: AuthService,
    protected userProfileFacade: UserProfileFacade,
    protected winRef: WindowRef
  ) {
    this.onAuth();
    this.onCurrencyChange();
  }

  /**
   * Registers events for the auth events.
   */
  protected onAuth(): void {
    this.subscriptions.add(
      this.eventService.get(LogoutEvent).subscribe(() => {
        this.restoreAnonymousCurrency();
        this.globalMessageService.add(
          { key: 'authMessages.signedOutSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
    );

    this.subscriptions.add(
      this.eventService
        .get(LoginEvent)
        .pipe(
          switchMap(() =>
            this.userAccountFacade.get().pipe(filter(isNotNullable), take(1))
          ),
          map((user) => user?.currency?.isocode),
          filter(isNotNullable)
        )
        .subscribe((currencyIsocode) => {
          this.storeAnonymousCurrencySnapshot();
          this.currencyService.setActive(currencyIsocode);
          this.restoreAnonymousCurrencyInStorage();
        })
    );
  }

  /**
   * Persists active currency for logged-in users when it changes in FE.
   */
  protected onCurrencyChange(): void {
    this.subscriptions.add(
      this.eventService
        .get(CurrencySetEvent)
        .pipe(
          switchMap((event) =>
            this.authService.isUserLoggedIn().pipe(
              filter((isLoggedIn) => isLoggedIn),
              map(() => event.activeCurrency)
            )
          ),
          tap(() => this.restoreAnonymousCurrencyInStorage()),
          switchMap((activeCurrency) =>
            this.userAccountFacade.get().pipe(
              filter(isNotNullable),
              take(1),
              filter((user) => user?.currency?.isocode !== activeCurrency),
              map(() => activeCurrency)
            )
          ),
          switchMap((activeCurrency) =>
            this.userProfileFacade.update({
              currency: { isocode: activeCurrency },
            })
          )
        )
        .subscribe()
    );
  }

  protected storeAnonymousCurrencySnapshot(): void {
    this.anonymousCurrencyStorageValue =
      this.winRef.localStorage?.getItem(CURRENCY_STORAGE_KEY) ?? null;
  }

  protected restoreAnonymousCurrencyInStorage(): void {
    if (this.anonymousCurrencyStorageValue === undefined) {
      return;
    }

    if (this.anonymousCurrencyStorageValue === null) {
      this.winRef.localStorage?.removeItem(CURRENCY_STORAGE_KEY);
      return;
    }

    console.log(
      '[localStorage.setItem]',
      CURRENCY_STORAGE_KEY,
      this.anonymousCurrencyStorageValue
    );
    console.trace('[localStorage.setItem] stack');
    this.winRef.localStorage?.setItem(
      CURRENCY_STORAGE_KEY,
      this.anonymousCurrencyStorageValue
    );
  }

  protected restoreAnonymousCurrency(): void {
    this.restoreAnonymousCurrencyInStorage();

    const anonymousCurrency = this.getAnonymousCurrencyFromStorage();
    if (anonymousCurrency) {
      this.currencyService.setActive(anonymousCurrency);
    }
  }

  protected getAnonymousCurrencyFromStorage(): string | undefined {
    if (!this.anonymousCurrencyStorageValue) {
      return undefined;
    }

    return JSON.parse(this.anonymousCurrencyStorageValue) as string;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
