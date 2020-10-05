/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class StoreFinderConfig {
  googleMaps?: {
    apiUrl?: string;
    apiKey?: string;
    scale?: number;
    selectedMarkerScale?: number;
    radius?: number;
    animate?: boolean;
    markerConfig?: (element: any, index: number) => google.maps.MarkerOptions;
  };
}
