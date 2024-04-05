import { LOCATION_INITIALIZED } from '@angular/common';
import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { MULTI_LOCATION_INITIALIZED } from './multi-location-initialized-token';

/**
 * Factory function that initializes the location.
 * It retrieves the initializers from the MULTI_LOCATION_INITIALIZED injection token,
 * invokes each initializer, and returns a promise that resolves when all initializers have completed.
 * @returns A promise that resolves when all initializers have completed.
 */
function locationInitializedFactory() {
  const initializers =
    inject(MULTI_LOCATION_INITIALIZED, { optional: true }) ?? [];
  const promiseInitializers = initializers.map((initializer) => initializer());
  return Promise.all(promiseInitializers);
}

@NgModule()
export class MultiLocationInitializedModule {
  static forRoot(): ModuleWithProviders<MultiLocationInitializedModule> {
    return {
      ngModule: MultiLocationInitializedModule,
      providers: [
        {
          provide: LOCATION_INITIALIZED,
          useFactory: locationInitializedFactory,
        },
      ],
    };
  }
}
