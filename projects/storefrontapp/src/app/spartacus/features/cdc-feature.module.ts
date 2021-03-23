import { NgModule } from '@angular/core';
import { CdcRootModule } from '@spartacus/cdc/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CdcRootModule.forRoot({
      cdc: [
        {
          baseSite: 'electronics-cdc',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
        {
          baseSite: 'electronics-spa',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
      ],
    }),
  ],
  providers: [
    provideConfig({
      featureModules: {
        asm: {
          module: () => import('@spartacus/cdc').then((m) => m.CdcModule),
        },
      },
    }),
  ],
})
export class CdcFeatureModule {}
