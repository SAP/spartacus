/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import type { i18n, InitOptions } from 'i18next';
import I18nextResourcesToBackend from 'i18next-resources-to-backend';
import { I18nConfig } from '../../config/i18n-config';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextBackendService } from './i18next-backend.service';

@Injectable({ providedIn: 'root' })
export class I18nextDefaultBackendService implements I18nextBackendService {
  constructor(
    protected config: I18nConfig,
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n
  ) {
    //spike todo remove
    console.log('using I18nextDefaultBackendService');
  }

  initialize(): InitOptions {
    const loader = this.config.i18n?.backend?.loader;

    if (!loader || typeof loader !== 'function') {
      throw new Error('The config `i18n.backend.loader` is not a function!');
    }

    this.i18next.use(I18nextResourcesToBackend(loader));

    return { backend: {} };
  }
}
