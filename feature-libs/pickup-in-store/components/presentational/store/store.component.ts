/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { storeHasStock } from '@spartacus/pickup-in-store/core';
import { ICON_TYPE } from '@spartacus/storefront';

/**
 * A store in the store list including address, opening times, stock level, and
 * distance from the search location.
 */
@Component({
  selector: 'cx-store',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  /** The details of the store to be displayed */
  @Input() storeDetails: PointOfServiceStock = {};
  /** An event emitter triggered when this store is selected for pickup */
  @Output()
  storeSelected: EventEmitter<PointOfServiceStock> = new EventEmitter<PointOfServiceStock>();

  isInStock: boolean;
  openHoursOpen = false;
  readonly ICON_TYPE = ICON_TYPE;

  ngOnInit(): void {
    this.isInStock = storeHasStock(this.storeDetails);
  }

  /**
   * Select the current store for pickup.
   */
  selectStore(): boolean {
    this.storeSelected.emit(this.storeDetails);
    // return false to prevent this button adding to cart
    return false;
  }

  /**
   * Toggle whether the store's opening hours are visible.
   */
  toggleOpenHours(): boolean {
    this.openHoursOpen = !this.openHoursOpen;
    return false;
  }
}
