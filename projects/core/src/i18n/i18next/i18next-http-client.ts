import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';

export type I18nextHttpClient = (
  url: string,
  options: object,
  callback: Function,
  data: object
) => void;

/**
 * Function appropriate for i18next to make http calls for JSON files.
 * See docs for `i18next-xhr-backend`: https://github.com/i18next/i18next-xhr-backend#backend-options
 *
 * It uses Angular HttpClient under the hood, so it works in SSR.
 * @param httpClient Angular http client
 */
export const I18NEXT_HTTP_CLIENT = new InjectionToken<I18nextHttpClient>(
  'Http client used by i18next for fetching translation resources from backend',
  {
    providedIn: 'root',
    factory: () => {
      const httpClient = inject(HttpClient);

      return (
        url: string,
        _options: object,
        callback: Function,
        _data: object
      ) => {
        httpClient.get(url, { responseType: 'text' }).subscribe(
          (data) => callback(data, { status: 200 }),
          (error) => callback(null, { status: error.status })
        );
      };
    },
  }
);
