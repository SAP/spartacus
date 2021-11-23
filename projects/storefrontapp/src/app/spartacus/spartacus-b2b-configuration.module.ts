import { NgModule } from '@angular/core';
import {
  defaultB2bCheckoutConfig,
  defaultB2bOccConfig,
} from '@spartacus/checkout/b2b/root';
import { provideConfig, SiteContextConfig } from '@spartacus/core';
import {
  defaultB2bCheckoutConfig as oldDefaultB2bCheckoutConfig,
  defaultB2bOccConfig as oldDefaultB2bOccConfig,
} from '@spartacus/setup';
import {
  defaultCmsContentProviders,
  layoutConfig,
  mediaConfig,
  PWAModuleConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';

let checkoutConfig = defaultB2bCheckoutConfig;
let checkoutOccConfig = defaultB2bOccConfig;

if (environment.oldCheckout) {
  checkoutConfig = oldDefaultB2bCheckoutConfig;
  checkoutOccConfig = oldDefaultB2bOccConfig;
}

@NgModule({
  providers: [
    // b2c
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    // b2b
    provideConfig(checkoutOccConfig),
    provideConfig(checkoutConfig),
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
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
