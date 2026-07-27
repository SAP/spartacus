/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
  WindowRef,
  getLastValueSync,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Storage key (feature part, without the `spartacus⚿<context>⚿` prefix added by
 * `StatePersistenceService`) holding the guest cart entries pending merge into
 * the user cart after an OAuth 2.1 authorization-code login
 * (see `mergeGuestCartOnCodeFlowLogin`).
 */
export const PENDING_GUEST_CART_MERGE_KEY = 'pendingGuestCartMerge';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartStatePersistenceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected siteContextParamsService = inject(SiteContextParamsService);
  protected winRef = inject(WindowRef);
  protected subscription?: Subscription;

  /**
   * Starts persisting the given guest cart entries under the base-site context.
   * Each emission is normalized to the minimal `{ product: { code }, quantity }`
   * shape before it is written to storage.
   *
   * @param guestCartEntries$ Guest cart entries to persist (empty array clears).
   */
  initSync(guestCartEntries$: Observable<OrderEntry[]>): void {
    this.subscription = this.statePersistenceService.syncWithStorage({
      key: PENDING_GUEST_CART_MERGE_KEY,
      state$: guestCartEntries$.pipe(
        map((entries) => this.normalizeEntriesToPersist(entries))
      ),
      context$: this.getContext$(),
      storageType: StorageSyncType.LOCAL_STORAGE,
    });
  }

  /**
   * Synchronously reads the persisted guest cart entries, or `undefined` when
   * nothing (or an empty list) is stored.
   */
  readState(): OrderEntry[] | undefined {
    const entries = this.statePersistenceService.readStateFromStorage<
      OrderEntry[]
    >({
      key: PENDING_GUEST_CART_MERGE_KEY,
      context: getLastValueSync(this.getContext$()),
      storageType: StorageSyncType.LOCAL_STORAGE,
    });
    return entries?.length ? entries : undefined;
  }

  /**
   * Removes the persisted guest cart entries from storage. The whole entry is
   * removed so no stale `pendingGuestCartMerge` key is left behind after the
   * merge. Writing an empty state through `syncWithStorage` would only overwrite
   * it with `[]`, not remove it, so we clear the key directly.
   */
  clearState(): void {
    const context = getLastValueSync(this.getContext$()) ?? '';
    this.winRef.localStorage?.removeItem(
      this.generateKeyWithContext(context, PENDING_GUEST_CART_MERGE_KEY)
    );
  }

  protected getContext$(): Observable<string | Array<string>> {
    return this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]);
  }

  protected normalizeEntriesToPersist(
    entries: OrderEntry[] = []
  ): OrderEntry[] {
    return entries
      .map((entry) => ({
        product: { code: entry.product?.code },
        quantity: entry.quantity,
      }))
      .filter((entry) => entry.product.code && entry.quantity);
  }

  /**
   * Builds the fully-qualified storage key the same way `StatePersistenceService`
   * does (`spartacus⚿<context>⚿<key>`), so removal targets the exact entry it wrote.
   */
  protected generateKeyWithContext(
    context: string | Array<string>,
    key: string
  ): string {
    return `spartacus⚿${([] as Array<string>)
      .concat(context)
      .join('⚿')}⚿${key}`;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
