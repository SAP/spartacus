/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExecutionOptions } from '@angular-devkit/schematics';

export interface Schema extends Partial<ExecutionOptions> {
  /**
   * The name of the project in which to execute schematics.
   */
  project: string;
  /**
   * When enabled, prints the additional logs.
   */
  debug?: boolean;
  /**
   * The marker module for which
   * to find or generate a new wrapper module.
   */
  markerModuleName: string;
  /**
   * Name of the feature module
   * to add to the wrapper module.
   */
  featureModuleName: string;
  /**
   * Internal options.
   * Should not be set by the user.
   */
  internal?: {
    /**
     * Path of the wrapper module.
     */
    wrapperModulePath?: string;
  };
}
