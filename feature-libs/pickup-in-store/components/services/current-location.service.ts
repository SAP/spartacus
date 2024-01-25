/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';

/**
 * A service to wrap the browser's current position API.
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {
  constructor(protected windowRef: WindowRef) {
    // Intentional empty constructor
  }

  /**
   * Obtains the user's current position for the browser and calls the provided callback with it.
   *
   * @param successCallback - A callback to be called with the current location.
   * @param errorCallback - A callback to be called with the error.
   * @param options - Options for the current position API.
   */
  getCurrentLocation(
    successCallback: PositionCallback,
    errorCallback?: PositionErrorCallback | null,
    options?: PositionOptions
  ): void {
    this.windowRef.nativeWindow?.navigator?.geolocation?.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }
}
