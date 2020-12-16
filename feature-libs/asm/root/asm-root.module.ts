import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAsmLayoutConfig } from './config/default-asm-layout.config';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultAsmLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        asm: {
          dependencies: {},
        },
      },
    }),
  ],
})
export class AsmRootModule {}
