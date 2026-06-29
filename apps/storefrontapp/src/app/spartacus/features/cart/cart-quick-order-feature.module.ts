import { NgModule } from '@angular/core';
import {
  quickOrderTranslationChunksConfig,
  quickOrderTranslationsEn,
} from '@spartacus/cart/quick-order/assets';
import { CART_QUICK_ORDER_FEATURE, QuickOrderRootModule } from '@spartacus/cart/quick-order/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [QuickOrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_QUICK_ORDER_FEATURE]: {
          module: () => import('@spartacus/cart/quick-order').then((m) => m.QuickOrderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: quickOrderTranslationsEn },
        chunks: quickOrderTranslationChunksConfig,
      },
    }),
  ],
})
export class CartQuickOrderFeatureModule {}
