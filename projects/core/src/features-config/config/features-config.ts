export class FeaturesConfig {
  features?: {
    level?: string;
    [featureToggle: string]: string | boolean;
  };
}
