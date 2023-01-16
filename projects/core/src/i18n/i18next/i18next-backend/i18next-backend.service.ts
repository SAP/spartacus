/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import type { InitOptions } from 'i18next';
import { I18nextHttpBackendService } from './i18next-http-backend.service';

/**
 * Configures an i18next backend plugin, to allow for loading translations from external resources.
 *
 * By default it configures and uses the `I18nextHttpBackendService`.
 *
 * It's an extension point to allow for providing potentially different i18next backend plugins.
 * See the list of available plugins: https://www.i18next.com/overview/plugins-and-utils#backends
 */
@Injectable({ providedIn: 'root', useExisting: I18nextHttpBackendService })
export abstract class I18nextBackendService {
  /**
   * Configures an i18next backend plugin, to allow for loading translations from external resources.
   */
  abstract initialize(): InitOptions;
}
