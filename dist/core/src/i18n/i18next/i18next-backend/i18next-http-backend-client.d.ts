import { InjectionToken } from '@angular/core';
import type { BackendOptions, RequestCallback } from 'i18next-http-backend';
export type I18nextHttpBackendClient = BackendOptions['request'];
/**
 * Function to be used by the `i18next-http-backend` plugin for loading translations via http.
 */
export declare const I18NEXT_HTTP_BACKEND_CLIENT: InjectionToken<((options: BackendOptions, url: string, payload: string | {}, callback: RequestCallback) => void) | undefined>;
