import { StoreFinderService } from './store-finder.service';
import { StoreDataService } from './store-data.service';
import { GoogleMapRendererService } from './google-map-renderer.service';
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { WindowRef } from './window-ref';

export const services: any[] = [
  StoreFinderService,
  StoreDataService,
  GoogleMapRendererService,
  ExternalJsFileLoader,
  WindowRef
];

export * from './store-finder.service';
export * from './store-data.service';
