export abstract class FeaturesConfig {
  features?: {
    [featureToggle: string]: string | boolean;
  };
}
