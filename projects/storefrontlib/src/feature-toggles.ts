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
  };
}
