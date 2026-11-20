/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { JsonPipe } from '@angular/common';
import { Component, Input, inject, input } from '@angular/core';
import { PointOfService, TranslatePipe } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { ScheduleComponent } from '../schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';

@Component({
  selector: 'cx-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  imports: [
    ScheduleComponent,
    StoreFinderMapComponent,
    JsonPipe,
    TranslatePipe,
  ],
})
export class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
  protected override storeFinderService = inject(StoreFinderService);

  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input() location: PointOfService;
  readonly disableMap = input<boolean>();
}
