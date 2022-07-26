import { Injectable, OnDestroy } from '@angular/core';
import { ConsentService, WindowRef } from '@spartacus/core';
import { PREFERRED_STORE_LOCAL_STORAGE_KEY } from '@spartacus/pickup-in-store/root';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PickupInStoreConfig } from '../config';

/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
@Injectable()
export class PreferredStoreService implements OnDestroy {
  subscription?: Subscription;

  constructor(
    protected readonly consentService: ConsentService,
    protected config: PickupInStoreConfig,
    protected readonly winRef: WindowRef
  ) {}

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
    this.subscription = this.consentService
      .checkConsentGivenByTemplateId(
        this.config.pickupInStore?.consentTemplateId ?? ''
      )
      .pipe(filter((consentGiven) => consentGiven))
      .subscribe(() => {
        this.winRef.localStorage?.setItem(
          PREFERRED_STORE_LOCAL_STORAGE_KEY,
          preferredStore
        );
      });
  }

  /**
   * Clears the user's preferred store for Pickup in Store.
   */
  clearPreferredStore(): void {
    this.winRef.localStorage?.removeItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
  }

  /**
   * Unsubscribes to dangling subscriptions before destroying the service.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
