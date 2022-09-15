/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeatureToggles {
  features?: {
    /**
     * Configure feature level.
     * Value corresponds to minor (feature) release version number: '1.0', '1.1', etc.
     * Each subsequent level contains all of the features from previous one.
     */
    level?: string;
    consignmentTracking?: boolean;

    /**
     * The 3.0 version introduced an unified configuration that emits new configuration
     * every time lazy loaded module is instantiated. To ease transition to this new
     * mechanism, the same changes are also published to global Config token under
     * the hood, which could cause issues in some implementations.
     *
     *This option allows to disable this mechanism, i.e.:
     *  - configuration won't change after app will be bootstrapped
     *  - if any service would like to take into an account configuration from
     *    lazy loaded modules, it will have to use ConfigurationService.unifiedConfig$
     */
    disableConfigUpdates?: boolean;

    /**
     * To fix certain features when a customer agent is emulating a user, we must send a header called
     * "sap-commerce-cloud-user-id" to the backend fetching certain data as the user, rather than the
     * agent. However, the header will break instances of Commerce Cloud who do not allow requests with
     * this header. (For example, the configuration "corsfilter.commercewebservices.allowedHeaders" will
     * need to allow it.)
     *
     * Enabling this feature will send the emulated user's IDs on requests that need it as context.
     */
    enableCommerceCloudUserIdHeader?: boolean;
  };
}
