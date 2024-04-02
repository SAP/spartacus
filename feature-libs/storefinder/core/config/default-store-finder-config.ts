/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoreFinderConfig } from './store-finder-config';

export const defaultStoreFinderConfig: StoreFinderConfig = {
  googleMaps: {
    apiUrl: 'https://maps.googleapis.com/maps/api/js',
    apiKey: '',
    scale: 5,
    selectedMarkerScale: 17,
    radius: 50000,
  },
};
