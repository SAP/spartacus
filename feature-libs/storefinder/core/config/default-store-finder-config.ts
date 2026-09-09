/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
    // Required by advanced markers (feature toggle `useAdvancedGoogleMarkers`).
    // 'DEMO_MAP_ID' is a Google-provided id that renders advanced markers
    // without any Cloud-based map styling. Replace it with your own map id.
    mapId: 'DEMO_MAP_ID',
  },
};
