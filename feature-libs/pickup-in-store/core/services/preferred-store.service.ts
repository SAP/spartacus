import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { PREFERRED_STORE_LOCAL_STORAGE_KEY } from '@spartacus/pickup-in-store/root';

/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
@Injectable()
export class PreferredStoreService {
  constructor(protected readonly winRef: WindowRef) {}

  /**
   * Gets the user's preferred store for Pickup in Store.
   * @returns the preferred store from local storage
   */
  getPreferredStore(): string | null | undefined {
    return this.winRef.localStorage?.getItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
  }

  /**
   * Sets the user's preferred store for Pickup in Store.
   * @param preferredStore the preferred store to set
   */
  setPreferredStore(preferredStore: string): void {
    this.winRef.localStorage?.setItem(
      PREFERRED_STORE_LOCAL_STORAGE_KEY,
      preferredStore
    );
  }

  /**
   * Clears the user's preferred store for Pickup in Store.
   */
  clearPreferredStore(): void {
    this.winRef.localStorage?.removeItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
  }
}
