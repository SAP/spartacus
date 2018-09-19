import { StoreFinderService } from './store-finder.service';
import { StoreDataService } from './store-data.service';
import { GoogleMapRendererService } from './google-map-renderer.service';
import { ExternalJsFileLoader } from './external-js-file-loader.service';

export const services: any[] = [
  StoreFinderService,
  StoreDataService,
  GoogleMapRendererService,
  ExternalJsFileLoader
];

export * from './store-finder.service';
export * from './store-data.service';
