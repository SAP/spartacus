/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { i18n, InitOptions } from 'i18next';
import I18nextResourcesToBackend from 'i18next-resources-to-backend';
import { I18nConfig } from '../../config/i18n-config';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
// [CXSPA-2060]
// To prepare for a future minor 6.x release, we intend to utilize 'i18next-resources-to-backend'.
// However, we won't be able to introduce a new peer dependency in a minor release as it would constitute
// a breaking change. Therefore, now in version 6.0, we simulate the use of this library,
// but the actual implementation using it will occur at a later date (in 6.x).
export * as I18nextResourcesToBackend from 'i18next-resources-to-backend'; // not exported in public API

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- loader's presence is already checked by `hasMatch()`
    const loader = this.config.i18n?.backend?.loader!;

    this.i18next.use(I18nextResourcesToBackend(loader));

    return { backend: {} };
  }
}
