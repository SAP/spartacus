import { NgModule } from '@angular/core';
import {
  commerceQuotesTranslationChunksConfig,
  commerceQuotesTranslations,
} from '@spartacus/commerce-quotes/assets';
import { provideConfig } from '@spartacus/core';
import {
  CommerceQuotesRootModule,
  COMMERCE_QUOTES_FEATURE,
} from 'feature-libs/commerce-quotes/root';

@NgModule({
  imports: [CommerceQuotesRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [COMMERCE_QUOTES_FEATURE]: {
          module: () =>
            import('@spartacus/commerce-quotes').then(
              (m) => m.CommerceQuotesModule
            ),
        },
      },
      i18n: {
        resources: commerceQuotesTranslations,
        chunks: commerceQuotesTranslationChunksConfig,
      },
    }),
  ],
})
export class CommerceQuotesFeatureModule {}
