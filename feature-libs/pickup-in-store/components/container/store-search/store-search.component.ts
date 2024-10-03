/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { CurrentLocationService } from '../../services/current-location.service';

/**
 * The search box and find my location button for finding points of
 * service to pickup from. Also with controls for toggling the display of
 * locations without stock.
 */
@Component({
  selector: 'cx-store-search',
  templateUrl: './store-search.component.html',
})
export class StoreSearchComponent {
  /** Whether the hide out of stock checkbox appears checked */
  @Input() hideOutOfStock = false;

  /** Whether out of stock locations should be hidden in the search list */
  @Output() eventHideOutOfStock = new EventEmitter<boolean>();
  /** The search parameters used to find pickup stores */
  @Output() findStores = new EventEmitter<LocationSearchParams>();
  /** Whether the loading spinner should be displayed */
  @Output() showSpinner = new EventEmitter<boolean>();

  constructor(protected currentLocationService: CurrentLocationService) {
    // Intentional empty constructor
  }

  /** Initiate a free text location search */
  onFindStores(location: string): boolean {
    this.findStores.emit({ location });
    return false;
  }

  /** Toggle whether locations without stock should be displayed */
  onHideOutOfStock(): void {
    this.eventHideOutOfStock.emit(!this.hideOutOfStock);
  }

  /** Initiate a latitude and longitude search using the current browser location */
  useMyLocation(): void {
    this.showSpinner.emit(true);
    this.currentLocationService.getCurrentLocation(
      ({ coords: { latitude, longitude } }) => {
        this.findStores.emit({ latitude, longitude });
        this.showSpinner.emit(false);
      }
    );
  }
}
