import { NgModule } from '@angular/core';
import { CdcConfig, CdcJsService, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
import { AuthService, CmsConfig, GlobalMessageService, NotAuthGuard, provideConfig, WindowRef } from '@spartacus/core';
import { LoginFormComponent, LoginFormComponentService } from '@spartacus/user/account/components';
import { CdcLoginComponentService } from 'integration-libs/cdc/core/auth/services/user-authentication/cdc-login.service';

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
    provideConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: LoginFormComponentService,
              useClass: CdcLoginComponentService,
              deps: [AuthService, GlobalMessageService, WindowRef, CdcJsService],
            },
          ],
        },
      },
    })
  ],
})
export class CdcFeatureModule {}
