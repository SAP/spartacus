import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { OrderRootModule, ORDER_FEATURE } from '@spartacus/order/root';

@NgModule({
  imports: [OrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_FEATURE]: {
          module: () => import('@spartacus/order').then((m) => m.OrderModule),
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
