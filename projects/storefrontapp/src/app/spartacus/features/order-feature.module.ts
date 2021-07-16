import { NgModule } from '@angular/core';
import {
  CART_ORDER_FEATURE,
  OrderRootModule,
} from '@spartacus/cart/order/root';
import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [OrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_ORDER_FEATURE]: {
          module: () =>
            import('@spartacus/cart/order').then((m) => m.OrderModule),
        },
      },
    }),
    /*provideConfig(<I18nConfig>{
      i18n: {
        resources: savedCartTranslations,
        chunks: savedCartTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),*/
  ],
})
export class OrderFeatureModule {}
