/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Input, Directive, inject } from '@angular/core';
import { StoreFinderService } from '@spartacus/storefinder/core';

/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive()
export class AbstractStoreItemComponent {
  protected storeFinderService = inject(StoreFinderService);

  @Input() location;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getDirections(location: any): string {
    return this.storeFinderService.getDirections(location);
  }

  getFormattedStoreAddress(addressParts: string[]): string {
    return addressParts.filter(Boolean).join(', ');
  }
}
