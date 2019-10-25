export abstract class FeaturesConfig {
  features?: {
    [featureToggle: string]: string | boolean;
  };
}

export const ANONYMOUS_CONSENTS_FEATURE = 'anonymousConsents';
