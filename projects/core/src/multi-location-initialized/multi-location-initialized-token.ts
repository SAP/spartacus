import { InjectionToken } from '@angular/core';

/**
 * Wrapper InjectionToken for LOCATION_INITIALIZED token to allow multiple initializers.
 */
export const MULTI_LOCATION_INITIALIZED = new InjectionToken<
  (() => Promise<any>)[]
>('MULTI_LOCATION_INITIALIZED');
