import { StoreFinderService } from './store-finder.service';
import { StoreDataService } from './store-data.service';
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { GoogleMapRendererService } from './google-map-renderer.service';

export const services: any[] = [
  StoreFinderService,
  StoreDataService,
  ExternalJsFileLoader,
  GoogleMapRendererService
];

export * from './store-finder.service';
export * from './store-data.service';
