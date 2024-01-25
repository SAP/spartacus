/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, Optional } from '@angular/core';
import type { InitOptions } from 'i18next';
import { resolveApplicable } from '../../../util';
import { I18nextBackendInitializer } from './i18next-backend.initializer';

/**
 * Configures an i18next backend plugin, to allow for loading translations from external resources.
 *
 * By default it configures and uses the `I18nextHttpBackendService`.
 *
 * It's an extension point to allow for providing potentially different i18next backend plugins.
 * See the list of available plugins: https://www.i18next.com/overview/plugins-and-utils#backends
 */
@Injectable({ providedIn: 'root' })
export class I18nextBackendService {
  constructor(
    @Optional()
    @Inject(I18nextBackendInitializer)
    protected backendInitializers: I18nextBackendInitializer[] | null
  ) {}

  /**
   * Configures an i18next backend plugin, to allow for loading translations from external resources.
   *
   * @returns Additional configuration to be used when initializing the i18next instance.
   */
  initialize(): InitOptions {
    const backendInitializer = resolveApplicable(
      this.backendInitializers ?? []
    );
    return backendInitializer?.initialize() ?? {};
  }
}
