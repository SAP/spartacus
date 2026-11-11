/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, Input } from '@angular/core';
import {
  StoreFinderService,
  StoreLocationService,
} from '@spartacus/storefinder/core';

/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive()
export class AbstractStoreItemComponent {
  protected storeLocationService = inject(StoreLocationService);
  protected storeFinderService = inject(StoreFinderService);

  @Input() location;

  getDirections(location: any): string {
    return this.storeLocationService.getDirections(location);
  }

  getFormattedStoreAddress(addressParts: string[]): string {
    return addressParts.filter(Boolean).join(', ');
  }
}
