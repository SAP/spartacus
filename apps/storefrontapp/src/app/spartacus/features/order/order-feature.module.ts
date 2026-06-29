import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { orderTranslationChunksConfig, orderTranslationsEn } from '@spartacus/order/assets';
import { ORDER_FEATURE, OrderRootModule } from '@spartacus/order/root';

@NgModule({
  declarations: [],
  imports: [OrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_FEATURE]: {
          module: () => import('@spartacus/order').then((m) => m.OrderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: orderTranslationsEn },
        chunks: orderTranslationChunksConfig,
      },
    }),
  ],
})
export class OrderFeatureModule {}
