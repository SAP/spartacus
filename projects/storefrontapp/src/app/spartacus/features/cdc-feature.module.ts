import { NgModule } from '@angular/core';
import { CdcModule } from '@spartacus/cdc';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CdcModule.forRoot({
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
        cdc: {
          module: () =>
            import('@spartacus/cdc/components').then(
              (m) => m.CdcComponentsModule
            ),
        },
      },
    }),
  ],
})
export class CdcFeatureModule {}
