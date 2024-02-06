import { FactoryProvider, inject } from '@angular/core';
import { provideDefaultConfigFactory } from '../../config';
import { Flags } from './flags-tokens';

/**
 * Copies Flags to FeaturesConfig
 */
export const provideCopyFlagsToFeaturesConfig: () => FactoryProvider = () =>
  provideDefaultConfigFactory(() => {
    const flags = inject(Flags);
    return {
      features: {
        ...flags,
      },
    };
  });
