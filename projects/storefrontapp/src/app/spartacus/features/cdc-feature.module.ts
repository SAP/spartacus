import { NgModule } from '@angular/core';
import { CdcModule } from '@spartacus/cdc';

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
})
export class CdcFeatureModule {}
