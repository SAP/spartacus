export interface FeatureToggles {
  features?: {
    /**
     * Configure feature level.
     * Value corresponds to minor (feature) release version number: '1.0', '1.1', etc.
     * Each subsequent level contains all of the features from previous one.
     */
    level?: string;
    consignmentTracking?: boolean;
    anonymousConsents?: boolean;
    saveForLater?: boolean;
  };
}
