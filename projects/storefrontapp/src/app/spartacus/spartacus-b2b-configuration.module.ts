import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
} from '@spartacus/storefront';
import {
  defaultB2bCheckoutConfig,
  defaultB2bOccConfig,
} from '@spartacus/setup';

@NgModule({
  providers: [
    // b2c
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    // b2b
    provideConfig(defaultB2bOccConfig),
    provideConfig(defaultB2bCheckoutConfig),
    provideConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
  ],
})
export class SpartacusB2bConfigurationModule {}
