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

    // The properties below should be moved in the future
    // to the global config, because they are not temporary feature toggles
    // but rather permanent config options:

    /**
     * Enables displaying consignment tracking info in the order details view
     *
     * It's is enabled by default since v1.2.
     */
    consignmentTracking?: boolean;

    /**
     * The 3.0 version introduced an unified configuration that emits new configuration
     * every time lazy loaded module is instantiated. To ease transition to this new
     * mechanism, the same changes are also published to global Config token under
     * the hood, which could cause issues in some implementations.
     *
     * This option allows to disable this mechanism, i.e.:
     *  - configuration won't change after app will be bootstrapped
     *  - if any service would like to take into an account configuration from
     *    lazy loaded modules, it will have to use ConfigurationService.unifiedConfig$
     *
     * It's disabled by default and recommended to keep it so.
     */
    disableConfigUpdates?: boolean;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends FeaturesConfig {}
}
