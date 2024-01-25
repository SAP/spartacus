/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import type { i18n, InitOptions } from 'i18next';
import i18nextHttpBackend, { BackendOptions } from 'i18next-http-backend';
import { WindowRef } from '../../../window/window-ref';
import { I18nConfig } from '../../config/i18n-config';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import {
  I18nextHttpBackendClient,
  I18NEXT_HTTP_BACKEND_CLIENT,
} from './i18next-http-backend-client';

/**
 * Configures an i18next HTTP backend plugin,
 * to allow for loading translations via HTTP.
 */
@Injectable({ providedIn: 'root' })
export class I18nextHttpBackendInitializer
  implements I18nextBackendInitializer
{
  constructor(
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n,
    @Inject(I18NEXT_HTTP_BACKEND_CLIENT)
    protected i18nextHttpClient: I18nextHttpBackendClient,
    protected config: I18nConfig,
    protected windowRef: WindowRef
  ) {}

  /**
   * Tells whether this i18next backend is applicable, based on the configuration.
   */
  hasMatch(): boolean {
    return !!this.config.i18n?.backend?.loadPath;
  }

  /**
   * @override
   * Configures an i18next HTTP backend plugin,
   * to allow for loading translations via HTTP.
   */
  initialize(): InitOptions {
    this.i18next.use(i18nextHttpBackend);
    return { backend: this.getBackendConfig() };
  }

  /**
   * Returns the configuration for the i18next-http-backend plugin.
   */
  protected getBackendConfig(): BackendOptions {
    if (!this.config.i18n?.backend?.loadPath) {
      throw new Error('Missing config `i18n.backend.loadPath`.');
    }

    const loadPath = this.getLoadPath(this.config.i18n.backend.loadPath);

    const backend: BackendOptions = {
      loadPath,
      request: this.i18nextHttpClient,

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
    if (!this.windowRef.isBrowser() && !path.match(/^http(s)?:\/\//)) {
      if (path.startsWith('/')) {
        path = path.slice('/'.length);
      }
      if (path.startsWith('./')) {
        path = path.slice('./'.length);
      }
      const serverRequestOrigin = this.windowRef.location.origin;
      return `${serverRequestOrigin}/${path}`;
    }
    return path;
  }
}
