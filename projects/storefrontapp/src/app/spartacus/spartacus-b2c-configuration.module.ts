import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
} from '@spartacus/storefront';

@NgModule({
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: [
          'electronics-spa',
          'electronics',
          'apparel-de',
          'apparel-uk',
          'apparel-uk-spa',
        ],
      },
    }),
    provideConfig({
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
    provideConfig({
      cart: {
        selectiveCart: {
          enabled: true,
        },
      },
    }),
  ],
})
export class SpartacusB2cConfigurationModule {}
