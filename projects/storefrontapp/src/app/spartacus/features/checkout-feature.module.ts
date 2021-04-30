import { NgModule } from '@angular/core';
import { CheckoutModule } from '@spartacus/checkout';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/assets';
import { CheckoutRootModule } from '@spartacus/checkout/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CheckoutRootModule, CheckoutModule],
  providers: [
    provideConfig({
      // featureModules: {
      //   checkout: {
      //     module: () =>
      //       import('@spartacus/checkout').then((m) => m.CheckoutModule),
      //   },
      // },
      i18n: {
        resources: checkoutTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
    }),
  ],
})
export class CheckoutFeatureModule {}
