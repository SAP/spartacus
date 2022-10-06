/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { CurrentLocationService } from '../../services/current-location.service';

@Component({
  selector: 'cx-store-search',
  templateUrl: './store-search.component.html',
})
export class StoreSearchComponent {
  @Input() hideOutOfStock = false;

  @Output() findStores = new EventEmitter<LocationSearchParams>();
  @Output() eventHideOutOfStock = new EventEmitter<boolean>();
  @Output() showSpinner = new EventEmitter<boolean>();

  constructor(protected currentLocationService: CurrentLocationService) {
    // Intentional empty constructor
  }

  onFindStores(location: string): boolean {
    this.findStores.emit({ location });
    return false;
  }

  onHideOutOfStock(): void {
    this.eventHideOutOfStock.emit(!this.hideOutOfStock);
  }

  useMyLocation(): void {
    this.showSpinner.emit(true);
    const t1 = new Date();
    this.currentLocationService.getCurrentLocation(
      ({ coords: { latitude, longitude } }) => {
        console.log(
          'geolocation acquisition time',
          (new Date().getTime() - t1.getTime()) / 1000
        );
        this.findStores.emit({ latitude, longitude });
        this.showSpinner.emit(false);
      }
    );
  }
}
