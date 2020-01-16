import { InjectionToken } from '@angular/core';

/**
 * The url of the server request when running SSR
 * */
export const SERVER_REQUEST_URL = new InjectionToken<string>(
  'SERVER_REQUEST_URL'
);
