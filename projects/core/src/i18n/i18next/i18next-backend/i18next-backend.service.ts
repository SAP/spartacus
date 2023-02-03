/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import type { InitOptions } from 'i18next';
import { I18nextDefaultBackendService } from './i18next-default-backend.service';

/**
 * Configures an i18next backend plugin, to allow for loading translations from external resources.
 *
 * It's an extension point to allow for providing potentially different i18next backend plugins.
 * See the list of available plugins: https://www.i18next.com/overview/plugins-and-utils#backends
 */
@Injectable({ providedIn: 'root', useExisting: I18nextDefaultBackendService })
export abstract class I18nextBackendService {
  /**
   * Configures an i18next backend plugin, to allow for loading translations from external resources.
   *
   * @returns Additional configuration to be used when initializing the i18next instance.
   */
  abstract initialize(): InitOptions;
}
