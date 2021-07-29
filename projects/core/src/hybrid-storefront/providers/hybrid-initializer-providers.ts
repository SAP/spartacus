import { APP_INITIALIZER, Provider } from '@angular/core';
import { HybridStorefrontInitializer } from '../services/hybrid-storefront-initializer';

export function initializeHybridStorefront(
  initializer: HybridStorefrontInitializer
) {
  const result = () => {
    initializer.initialize();
  };
  return result;
}

export const hybridInitializerProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeHybridStorefront,
    deps: [HybridStorefrontInitializer],
    multi: true,
  },
];
