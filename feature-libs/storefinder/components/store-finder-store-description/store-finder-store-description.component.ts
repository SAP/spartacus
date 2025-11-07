/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, inject } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

@Component({
  selector: 'cx-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  standalone: false,
})
export class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
  protected storeFinderService: StoreFinderService;

  @Input() location: PointOfService;
  @Input() disableMap: boolean;

  constructor() {
    const storeFinderService = inject(StoreFinderService);

    super(storeFinderService);
  
    this.storeFinderService = storeFinderService;
  }
}
