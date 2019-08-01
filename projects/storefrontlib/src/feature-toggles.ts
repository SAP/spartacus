export interface FeatureToggles {
  features?: {
    /**
     * Configure feature level.
     * Each subsequent level contains all of the features from previous one.
     */
    level?: '1.0' | 'next';
  };
}
