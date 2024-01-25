/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { InitOptions } from 'i18next';
import { Applicable } from '../../../util';

/**
 * Configures a specific i18next backend plugin, to allow for loading translations from external resources.
 */
@Injectable()
export abstract class I18nextBackendInitializer implements Applicable {
  /**
   * Configures an i18next backend plugin, to allow for loading translations from external resources.
   *
   * @returns Additional configuration to be used when initializing the i18next instance.
   */
  abstract initialize(): InitOptions;

  /**
   * Returns `true` if the backend is applicable.
   */
  hasMatch?(...params: any[]): boolean;
}
