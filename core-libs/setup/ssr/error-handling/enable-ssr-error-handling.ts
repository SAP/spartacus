import { InjectionToken } from '@angular/core';

/**
 * Toggle for enabling the SSR error handling.
 */
export const ENABLE_SSR_ERROR_HANDLING = new InjectionToken<boolean>(
  'ENABLE_SSR_ERROR_HANDLING'
);
