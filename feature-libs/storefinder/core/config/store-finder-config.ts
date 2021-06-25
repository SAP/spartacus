import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

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
  };
}

declare module '@spartacus/core' {
  interface Config extends StoreFinderConfig {}
}
