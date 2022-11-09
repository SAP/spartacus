import { InjectionToken } from '@angular/core';

/**
 * The url of the server request host when running SSR through express engine
 * */
export const EXPRESS_SERVER_REQUEST_ORIGIN = new InjectionToken<string>(
  'EXPRESS_SERVER_REQUEST_ORIGIN'
);

/**
 * The url of the server request when running SSR through express engine
 * */
export const EXPRESS_SERVER_REQUEST_URL = new InjectionToken<string>(
  'EXPRESS_SERVER_REQUEST_URL'
);
