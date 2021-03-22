import { NgModule } from '@angular/core';
import { CdcModule } from '@spartacus/cdc';
import { CdcComponentsModule } from '@spartacus/cdc/components';
import { CdcCoreModule } from '@spartacus/cdc/core';
import { CdcRootModule } from '@spartacus/cdc/root';

@NgModule({
  imports: [
    CdcComponentsModule,
    CdcCoreModule,
    CdcRootModule,
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
})
export class CdcFeatureModule {}
