/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class StoreLocationService {
  /**
   * Returns store latitude
   * @param location store location
   */
  getStoreLatitude(location: PointOfService): number | undefined {
    return location?.geoPoint?.latitude;
  }

  /**
   * Returns store longitude
   * @param location store location
   */
  getStoreLongitude(location: PointOfService): number | undefined {
    return location?.geoPoint?.longitude;
  }

  /**
   * Generates a link leading to the directions of the given store location
   * @param location store location
   * @returns URL for directions to the store
   */
  getDirections(location: PointOfService): string {
    const url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.getStoreLatitude(location);
    const longitude = this.getStoreLongitude(location);
    return url + latitude + ',' + longitude;
  }
}
