import { NgModule } from '@angular/core';
import { provideConfig, SiteContextConfig } from '@spartacus/core';
import {
  defaultB2bCheckoutConfig,
  defaultB2bOccConfig,
} from '@spartacus/setup';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
  PWAModuleConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';

const baseSite = environment.epdVisualization
  ? ['powertools-epdvisualization-spa', 'powertools-spa']
  : ['powertools-spa'];

@NgModule({
  providers: [
    // b2c
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    // b2b
    provideConfig(defaultB2bOccConfig),
    provideConfig(defaultB2bCheckoutConfig),
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: baseSite,
      },
    }),
    provideConfig(<PWAModuleConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
  ],
})
export class SpartacusB2bConfigurationModule {}
