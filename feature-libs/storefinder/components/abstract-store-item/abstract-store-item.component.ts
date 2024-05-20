/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Input, Directive } from '@angular/core';
import { StoreFinderService } from '@spartacus/storefinder/core';

/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive()
export class AbstractStoreItemComponent {
  @Input() location;

  constructor(protected storeFinderService: StoreFinderService) {}

  getDirections(location: any): string {
    return this.storeFinderService.getDirections(location);
  }

  getFormattedStoreAddress(addressParts: string[]): string {
    return addressParts.filter(Boolean).join(', ');
  }
}
