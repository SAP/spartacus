/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { i18n, InitOptions } from 'i18next';
import I18nextResourcesToBackend from 'i18next-resources-to-backend';
import { I18nConfig } from '../../config/i18n-config';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextBackendInitializer } from './i18next-backend.initializer';

@Injectable({ providedIn: 'root' })
export class I18nextResourcesToBackendInitializer
  implements I18nextBackendInitializer
{
  constructor(
    protected config: I18nConfig,
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n
  ) {}

  hasMatch(): boolean {
    return !!this.config.i18n?.backend?.loader;
  }

  initialize(): InitOptions {
    const loader = this.config.i18n?.backend?.loader;

    if (!loader) {
      throw new Error('Missing config `i18n.backend.loader`.');
    }

    this.i18next.use(I18nextResourcesToBackend(loader));

    return { backend: {} };
  }
}
