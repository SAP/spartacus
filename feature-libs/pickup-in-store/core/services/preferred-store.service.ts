/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  ConsentService,
  PointOfServiceStock,
  WindowRef,
} from '@spartacus/core';
import { PREFERRED_STORE_LOCAL_STORAGE_KEY } from '@spartacus/pickup-in-store/root';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PickupInStoreConfig } from '../config';

export type PointOfServiceNames = Pick<
  PointOfServiceStock,
  'name' | 'displayName'
>;

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
  getPreferredStore(): PointOfServiceNames | undefined {
    const preferredStore = this.winRef.localStorage?.getItem(
      PREFERRED_STORE_LOCAL_STORAGE_KEY
    );
    return preferredStore ? JSON.parse(preferredStore) : undefined;
  }

  /**
   * Sets the user's preferred store for Pickup in Store.
   * @param preferredStore the preferred store to set
   */
  setPreferredStore(preferredStore: PointOfServiceNames): void {
    this.subscription = this.consentService
      .checkConsentGivenByTemplateId(
        this.config.pickupInStore?.consentTemplateId ?? ''
      )
      .pipe(filter((consentGiven) => consentGiven))
      .subscribe(() => {
        this.winRef.localStorage?.setItem(
          PREFERRED_STORE_LOCAL_STORAGE_KEY,
          JSON.stringify(preferredStore)
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
