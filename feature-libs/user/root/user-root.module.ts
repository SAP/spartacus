import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  userTranslationChunksConfig,
  userTranslations,
} from '../assets/translations/translations';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig({
      featureModules: {
        user: {
          cmsComponents: ['UpdateEmailComponent'],
        },
      },
    }),
    provideDefaultConfig({
      i18n: {
        resources: userTranslations,
        chunks: userTranslationChunksConfig,
      },
    }),
  ],
})
export class UserRootModule {}
