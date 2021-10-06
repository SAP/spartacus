import { NgModule } from '@angular/core';
import { CdsConfig, CdsModule } from '@spartacus/cds';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CdsModule.forRoot()],
  providers: [
    provideConfig(<CdsConfig>{
      cds: {
        tenant: 'argotest',
        baseUrl: 'https://api.stage.context.cloud.sap',
        endpoints: {
          strategyProducts:
            '/strategy/${tenant}/strategies/${strategyId}/products',
        },
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
      },
    }),
    provideConfig(<CdsConfig>{
      cds: {
        profileTag: {
          javascriptUrl:
            'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
          configUrl:
            'https://tag.static.stage.context.cloud.sap/config/dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
          allowInsecureCookies: true,
        },
      },
    }),
  ],
})
export class CdsFeatureModule {}
