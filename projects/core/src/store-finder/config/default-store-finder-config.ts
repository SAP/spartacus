import { StoreFinderConfig } from './store-finder-config';

export const defaultStoreFinderConfig: StoreFinderConfig = {
  googleMaps: {
    apiUrl: 'https://maps.googleapis.com/maps/api/js',
    apiKey: '',
    scale: 12,
    selectedMarkerScale: 16
  }
};
