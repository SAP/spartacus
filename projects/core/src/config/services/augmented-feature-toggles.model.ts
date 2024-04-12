/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '../../features-config/feature-toggles/feature-toggles-tokens';

declare module '../../features-config/feature-toggles/feature-toggles-tokens' {
  interface FeatureToggles {
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
  }
}
