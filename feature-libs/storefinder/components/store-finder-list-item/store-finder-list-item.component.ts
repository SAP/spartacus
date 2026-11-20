/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, useFeatureStyles } from '@spartacus/core';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import { OutletDirective } from '@spartacus/storefront';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

@Component({
  selector: 'cx-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
  imports: [RouterLink, OutletDirective, TranslatePipe],
})
export class StoreFinderListItemComponent extends AbstractStoreItemComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  locationIndex: number | null = null;
  readonly listOrderLabel = input<any>();
  readonly displayDistance = input<boolean>();
  readonly useClickEvent = input<boolean>();
  readonly storeItemClick = output<number>();

  readonly StoreFinderOutlets = StoreFinderOutlets;

  constructor() {
    super();
    useFeatureStyles('a11yStoreFinderListItemFocus');
    useFeatureStyles('a11yHighContrastFix');
  }

  handleStoreItemClick() {
    if (this.locationIndex !== null) {
      this.storeItemClick.emit(this.locationIndex);
    }
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleStoreItemClick();
    }
  }
}
