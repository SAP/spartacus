import { StoreFinderService } from './store-finder.service';
import { StoreDataService } from './store-data.service';
import { ExternalJsFileLoader } from './external-js-file-loader.service';

export const services: any[] = [
  StoreFinderService,
  StoreDataService,
  ExternalJsFileLoader
];

export * from './store-finder.service';
export * from './store-data.service';
