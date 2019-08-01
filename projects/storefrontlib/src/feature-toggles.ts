export interface FeatureToggles {
  features?: {
    /**
     * Configure feature level.
     * Each subsequent level contains all of the features from previous one.
     */
    level?: string;
  };
}
