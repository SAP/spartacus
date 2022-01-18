import { NgModule } from '@angular/core';
import { CartConfig, provideConfig, SiteContextConfig } from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
  PWAModuleConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';

const defaultBaseSite = [
  'electronics-spa',
  'electronics',
  'apparel-de',
  'apparel-uk',
  'apparel-uk-spa',
];
const baseSite = environment.epdVisualization
  ? ['electronics-epdvisualization-spa'].concat(defaultBaseSite)
  : defaultBaseSite;

@NgModule({
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
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
    provideConfig(<CartConfig>{
      cart: {
        selectiveCart: {
          enabled: true,
        },
      },
    }),
  ],
})
export class SpartacusB2cConfigurationModule {}
