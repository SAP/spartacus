/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, StaticProvider } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import {
  I18nConfig,
  I18nextBackendService,
  SERVER_REQUEST_ORIGIN,
  SERVER_REQUEST_URL,
} from '@spartacus/core';
import { getRequestOrigin } from '../express-utils/express-request-origin';
import { getRequestUrl } from '../express-utils/express-request-url';
import { ServerOptions } from './model';
import { serverRequestOriginFactory } from './server-request-origin';
import { serverRequestUrlFactory } from './server-request-url';

import { I18NEXT_INSTANCE } from '@spartacus/core';
import type { i18n, InitOptions } from 'i18next';
import I18nextFsBackend from 'i18next-fs-backend';
import { SERVER_APP_DIST_FOLDER } from './server-app-dist-folder';

@Injectable({ providedIn: 'root' })
export class I18nextFilesystemBackendService implements I18nextBackendService {
  constructor(
    protected config: I18nConfig,
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n,
    @Inject(SERVER_APP_DIST_FOLDER)
    protected serverAppDistFolder: string
  ) {}

  initialize(): InitOptions {
    this.i18next.use(I18nextFsBackend);

    // SPIKE TODO:
    // - validate the loadPath is not empty
    // - validate that the loadPath is not http
    // - remove leading `./` or `/` from loadPath

    const configuredLoadPath = this.config.i18n?.backend?.loadPath ?? '';
    const loadPath = `${this.serverAppDistFolder}/${configuredLoadPath}`;

    return { backend: { loadPath } };
  }
}

/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export function provideServer(options?: ServerOptions): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: serverRequestOriginFactory(options),
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: serverRequestUrlFactory(options),
    },

    // spike todo remove
    {
      provide: I18nextBackendService,
      useExisting: I18nextFilesystemBackendService,
    },
  ];
}

/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
export function getServerRequestProviders(): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: getRequestOrigin,
      deps: [REQUEST],
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: getRequestUrl,
      deps: [REQUEST],
    },
  ];
}
