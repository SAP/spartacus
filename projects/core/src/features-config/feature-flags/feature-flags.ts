import { FeatureFlags } from './feature-flags-tokens';

declare module './feature-flags-tokens' {
  interface FeatureFlags {
    /**
     * Enables consignment tracking feature
     */
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
     * Enables truncating the paragraph in the CardComponent from @spartacus/storefront,
     * similarly to the Card's label
     */
    storeFrontLibCardParagraphTruncated?: boolean;

    /**
     * Enables displaying promotions in PDP
     */
    showPromotionsInPDP?: boolean;

    /**
     * Enables displaying the recent searches in the main search box
     */
    recentSearches?: boolean;
  }
}
