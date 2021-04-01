import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  ConfigInitializerService,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcJsService } from './auth/facade/cdc-js.service';
import { CdcLogoutGuard } from './auth/guards/cdc-logout.guard';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';

export function cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
) {
  const func = () =>
    configInit.getStableConfig('context', 'cdc').then(() => {
      cdcJsService.initialize();
    });
  return func;
}

export function defaultCdcComponentsConfig() {
  const config = {
    featureModules: {
      [CDC_FEATURE]: {
        cmsComponents: ['GigyaRaasComponent'],
      },
      // // by default core is bundled together with components
      [CDC_CORE_FEATURE]: CDC_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CdcAuthModule],
  providers: [
    provideDefaultConfigFactory(defaultCdcComponentsConfig),
    { provide: LogoutGuard, useExisting: CdcLogoutGuard },
    {
      provide: APP_INITIALIZER,
      useFactory: cdcJsFactory,
      deps: [CdcJsService, ConfigInitializerService],
      multi: true,
    },
  ],
})
export class CdcRootModule {}
