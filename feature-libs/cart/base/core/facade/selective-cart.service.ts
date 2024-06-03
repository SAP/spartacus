/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Cart,
  CartType,
  MultiCartFacade,
  OrderEntry,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class SelectiveCartService implements SelectiveCartFacade {
  protected selectiveCart$: Observable<Cart>;

  constructor(
    protected userProfileFacade: UserProfileFacade,
    protected multiCartFacade: MultiCartFacade,
    protected baseSiteService: BaseSiteService,
    protected userIdService: UserIdService
  ) {}

  /**
   * Initialize the stream when first call this function
   */
  getCart(): Observable<Cart> {
    if (!this.selectiveCart$) {
      this.selectiveCart$ = combineLatest([
        this.getSelectiveCartId(),
        this.userProfileFacade.get(),
        this.userIdService.getUserId(),
        this.baseSiteService.getActive(),
      ]).pipe(
        distinctUntilChanged(),
        tap(([selectiveId, user, userId, activeBaseSite]) => {
          if (
            !Boolean(selectiveId) &&
            userId !== OCC_USER_ID_ANONYMOUS &&
            user?.customerId
          ) {
            this.multiCartFacade.loadCart({
              userId: userId,
              cartId: `selectivecart${activeBaseSite}${user.customerId}`,
            });
          }
        }),
        filter(([selectiveId]) => Boolean(selectiveId)),
        switchMap(([selectiveId]) => this.multiCartFacade.getCart(selectiveId)),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.selectiveCart$;
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.getSelectiveCartId().pipe(
      switchMap((selectiveId) => this.multiCartFacade.getEntries(selectiveId))
    );
  }

  isStable(): Observable<boolean> {
    return this.getSelectiveCartId().pipe(
      switchMap((selectiveId) => this.multiCartFacade.isStable(selectiveId))
    );
  }

  addEntry(productCode: string, quantity: number): void {
    this.getSelectiveIdWithUserId().subscribe(([selectiveId, userId]) => {
      this.multiCartFacade.addEntry(userId, selectiveId, productCode, quantity);
    });
  }

  removeEntry(entry: OrderEntry): void {
    this.getSelectiveIdWithUserId().subscribe(([selectiveId, userId]) => {
      this.multiCartFacade.removeEntry(
        userId,
        selectiveId,
        entry.entryNumber as number
      );
    });
  }

  updateEntry(entryNumber: number, quantity: number): void {
    this.getSelectiveIdWithUserId().subscribe(([selectiveId, userId]) => {
      this.multiCartFacade.updateEntry(
        userId,
        selectiveId,
        entryNumber,
        quantity
      );
    });
  }

  getEntry(productCode: string): Observable<OrderEntry | undefined> {
    return this.getSelectiveCartId().pipe(
      switchMap((selectiveId) =>
        this.multiCartFacade.getEntry(selectiveId, productCode)
      )
    );
  }

  protected getSelectiveCartId(): Observable<string> {
    return this.multiCartFacade.getCartIdByType(CartType.SELECTIVE);
  }

  private getSelectiveIdWithUserId(): Observable<string[]> {
    return this.getSelectiveCartId().pipe(
      distinctUntilChanged(),
      withLatestFrom(this.userIdService.getUserId()),
      take(1)
    );
  }
}
