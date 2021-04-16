import { NgModule } from '@angular/core';
import { CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CdcRootModule],
  providers: [
    provideConfig({
      [CDC_FEATURE]: [
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
    provideConfig({
      featureModules: {
        cdc: {
          module: () => import('@spartacus/cdc').then((m) => m.CdcModule),
        },
      },
    }),
  ],
})
export class CdcFeatureModule {}
