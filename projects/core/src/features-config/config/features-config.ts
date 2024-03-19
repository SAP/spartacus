/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { FeatureFlags } from '../feature-flags/feature-flags-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FeaturesConfig {
  features?: FeaturesConfigContent;
}

export interface FeaturesConfigContent extends FeatureFlags {
  /**
   * Configure feature level.
   * Value corresponds to minor (feature) release version number: '1.0', '1.1', etc.
   * Each subsequent level contains all of the features from previous one.
   *
   * LEGACY. Instead of using this, use named feature flags.
   */
  level?: string;
  [featureToggle: string]: string | boolean | undefined;
}

declare module '../../config/config-tokens' {
  interface Config extends FeaturesConfig {}
}
