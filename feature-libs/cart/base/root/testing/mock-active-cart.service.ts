/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { User } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ActiveCartFacade } from '../facade/active-cart.facade';
import { Cart, OrderEntry } from '../models/cart.model';

/**
 * Mock of {@link ActiveCartFacade} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return of({});
  }

  takeActive(): Observable<Cart> {
    return of({});
  }

  getActiveCartId(): Observable<string> {
    return of('');
  }

  takeActiveCartId(): Observable<string> {
    return of('');
  }

  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  getLastEntry(): Observable<OrderEntry | undefined> {
    return of(undefined);
  }

  getLoading(): Observable<boolean> {
    return of(false);
  }

  isStable(): Observable<boolean> {
    return of(true);
  }

  addEntry(): void {}

  removeEntry(): void {}

  updateEntry(): void {}

  getEntry(): Observable<OrderEntry | undefined> {
    return of(undefined);
  }

  addEmail(): void {}

  getAssignedUser(): Observable<User> {
    return EMPTY;
  }

  isGuestCart(): Observable<boolean> {
    return of(false);
  }

  addEntries(): void {}

  requireLoadedCart(): Observable<Cart> {
    return of({});
  }

  reloadActiveCart(): void {}

  hasPickupItems(): Observable<boolean> {
    return of(false);
  }

  hasDeliveryItems(): Observable<boolean> {
    return of(false);
  }

  getPickupEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  getDeliveryEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
}
