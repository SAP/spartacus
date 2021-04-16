import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  ConfigInitializerService,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';

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
      // by default core is bundled together with components
      [CDC_CORE_FEATURE]: CDC_FEATURE,
    },
  };
  return config;
}

@NgModule({
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
