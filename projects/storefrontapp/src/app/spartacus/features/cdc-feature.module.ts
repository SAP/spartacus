import { NgModule } from '@angular/core';
import { CdcConfig, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CdcRootModule],
  providers: [
    provideConfig(<CdcConfig>{
      cdc: [
        {
          baseSite: 'electronics-cdc',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
        {
          baseSite: 'electronics-spa',
          javascriptUrl:
            'https://cdns.eu1.gigya.com/JS/gigya.js?apikey=3_k_wG-sllOhu2rjDEWHjG9-ncnnGAMHfkIcUKzl94weJU1Y18hITRgnTDp1LP8QdC',
          sessionExpiration: 3600,
        },
      ],
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [CDC_FEATURE]: {
          module: () => import('@spartacus/cdc').then((m) => m.CdcModule),
        },
      },
    }),
  ],
})
export class CdcFeatureModule {}
