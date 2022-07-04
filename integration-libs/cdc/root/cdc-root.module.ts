import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  CmsConfig,
  Config,
  ConfigInitializerService,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';

export function cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
): () => Promise<Config> {
  const func = () =>
    configInit
      .getStable('context', 'cdc')
      .pipe(
        tap(() => {
          cdcJsService.initialize();
        })
      )
      .toPromise();
  return func;
}

export function defaultCdcComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
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
