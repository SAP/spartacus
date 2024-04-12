/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

/**
 * @deprecated Please use a different util to provide values of feature toggles:
 *             ```ts
 *             provideFeatureToggles({
 *               [string]: boolean
 *             })
 *             ```
 *             instead of
 *             ```ts
 *             provideConfig({
 *               features: {
 *                 [string]: boolean
 *               }
 *             })
 *             ```
 *             If you need to inject feature toggles, please inject `FeatureToggles` token instead of `FeaturesConfig`.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FeaturesConfig {
  /**
   * @deprecated Please use a different util to provide values of feature toggles:
   *             ```ts
   *             provideFeatureToggles({
   *               [string]: boolean
   *             })
   *             ```
   *             instead of
   *             ```ts
   *             provideConfig({
   *               features: {
   *                 [string]: boolean
   *               }
   *             })
   *             ```
   */
  features?: {
    /**
     * Configure feature level.
     * Value corresponds to a specific release version number: '1.0', '1.1', etc.
     * Each subsequent level contains all of the features from previous one.
     *
     * @deprecated Please use named feature flags instead of feature level.
     *             Moreover, please use a different util to provide values of feature toggles:
     *             ```ts
     *             provideFeatureToggles({
     *               [string]: boolean
     *             })
     *             ```
     *             instead of
     *             ```ts
     *             provideConfig({
     *               features: {
     *                 [string]: boolean
     *               }
     *             })
     *             ```
     */
    level?: string;

    /**
     * @deprecated Please use a different util to provide values of feature toggles:
     *             ```ts
     *             provideFeatureToggles({
     *               [string]: boolean
     *             })
     *             ```
     *             instead of
     *             ```ts
     *             provideConfig({
     *               features: {
     *                 [string]: boolean
     *               }
     *             })
     *             ```
     */
    [_: string]: string | boolean | undefined;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends FeaturesConfig {}
}
