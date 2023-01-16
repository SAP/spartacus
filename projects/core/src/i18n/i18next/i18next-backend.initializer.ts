/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { i18n, InitOptions } from 'i18next';
import i18nextHttpBackend, {
  BackendOptions,
  RequestCallback,
} from 'i18next-http-backend';
import { WindowRef } from '../../window/window-ref';
import { I18nConfig } from '../config/i18n-config';
import { I18NEXT_INSTANCE } from './i18next-instance';

/**
 * Initializes the i18next backend plugin for loading translations from the backend.
 */
@Injectable({ providedIn: 'root' })
export class I18nextBackendInitializer {
  constructor(
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n,
    protected config: I18nConfig,
    protected httpClient: HttpClient,
    protected windowRef: WindowRef
  ) {}

  initialize(i18nextConfig: InitOptions): InitOptions {
    this.i18next.use(i18nextHttpBackend);
    const backendConfig = this.getI18nextBackendConfig();
    return { ...i18nextConfig, backend: backendConfig };
  }

  /**
   * Returns the configuration for the i18next backend plugin.
   */
  protected getI18nextBackendConfig(): BackendOptions {
    const loadPath = this.getLoadPath(
      // SPIKE TODO: improve typing:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.config.i18n!.backend!.loadPath!
    );
    const backend: BackendOptions = {
      loadPath,

      request: this.getI18nextHttpClient(),

      // Disable the periodical reloading. Otherwise SSR would not finish due to the pending task `setInterval()`
      // See source code of `i18next-http-backend` : https://github.com/i18next/i18next-http-backend/blob/00b7e8f67abf8372af17529b51190a7e8b17e3d8/lib/index.js#L40-L41
      reloadInterval: false,
    };
    return backend;
  }

  /**
   * Resolves the relative path to the absolute one in SSR, using the server request's origin.
   * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
   * - https://github.com/angular/angular/issues/19224
   * - https://github.com/angular/universal/issues/858
   */
  protected getLoadPath(path: string): string {
    // SPIKE NOTE: changed serverRequestOrigin to !this.windowRef.isBrowser()
    if (!this.windowRef.isBrowser() && !path.match(/^http(s)?:\/\//)) {
      if (path.startsWith('/')) {
        path = path.slice(1);
      }
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      const serverRequestOrigin = this.windowRef.location.origin;
      const result = `${serverRequestOrigin}/${path}`;
      return result;
    }
    return path;
  }

  /**
   * Returns a function appropriate for i18next to make http calls for JSON files.
   * See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
   *
   * It uses Angular HttpClient under the hood, so it works in SSR.
   */
  protected getI18nextHttpClient(): (
    options: BackendOptions,
    url: string,
    payload: object | string,
    callback: RequestCallback
  ) => void {
    return (
      _options: BackendOptions,
      url: string,
      _payload: object | string,
      callback: RequestCallback
    ) => {
      this.httpClient.get(url, { responseType: 'text' }).subscribe(
        (data) => callback(null, { status: 200, data }),
        (error) =>
          callback(error, {
            // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
            data: null as any,
            status: error.status,
          })
      );
    };
  }
}
