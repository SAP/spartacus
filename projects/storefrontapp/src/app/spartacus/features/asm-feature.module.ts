import { NgModule } from '@angular/core';
import {
  asmTranslationChunksConfig,
  asmTranslations,
} from '@spartacus/asm/assets';
import { AsmRootModule } from '@spartacus/asm/root';
import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [AsmRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        asm: {
          module: () => import('@spartacus/asm').then((m) => m.AsmModule),
        },
      },
      i18n: {
        resources: asmTranslations,
        chunks: asmTranslationChunksConfig,
      },
    }),
  ],
})
export class AsmFeatureModule {}
