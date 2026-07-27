/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
// eslint-disable-next-line @nx/workspace-no-self-public-api-import -- ESLint is misfiring here: core and root are not the same library — they're separate entry points
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

@Injectable({
  providedIn: 'root',
})
export class ActiveCartStatePersistenceService implements OnDestroy {
  protected statePersistenceService = inject(StatePersistenceService);
  protected siteContextParamsService = inject(SiteContextParamsService);
  protected winRef = inject(WindowRef);
  protected subscription?: Subscription;

  /**
   * Storage key (feature part, without the `spartacus⚿<context>⚿` prefix added
   * by `StatePersistenceService`) holding the guest cart entries pending merge
   * into the user cart after an OAuth 2.1 authorization-code login.
   */
  protected key = 'pendingGuestCartMerge';

  /**
   * Starts persisting the given guest cart entries under the base-site context.
   * Each emission is normalized to the minimal `{ product: { code }, quantity }`
   * shape and overwrites the stored value. Use `clearState()` to remove the
   * entry; emitting an empty array only persists `[]`, it does not remove it.
   *
   * @param guestCartEntries$ Guest cart entries to persist.
   */
  initSync(guestCartEntries$: Observable<OrderEntry[]>): void {
    this.subscription = this.statePersistenceService.syncWithStorage({
      key: this.key,
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
      key: this.key,
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
      this.generateKeyWithContext(context, this.key)
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
