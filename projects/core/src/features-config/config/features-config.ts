export interface FeaturesConfig {
  features?: {
    [featureToggle: string]: string | boolean;
  };
}
