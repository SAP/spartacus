/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import type { InitOptions } from 'i18next';

/**
 * Initializes the i18next backend plugin for loading translations from the backend.
 */
@Injectable()
export abstract class I18nextBackendService {
  /**
   * Initializes the i18next backend plugin for loading translations from the backend.
   */
  abstract initialize(): InitOptions;
}
