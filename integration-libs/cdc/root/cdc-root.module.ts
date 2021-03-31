import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  ConfigInitializerService,
  provideDefaultConfig,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcJsService } from './auth/facade/cdc-js.service';
import { CdcLogoutGuard } from './auth/guards/cdc-logout.guard';

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

@NgModule({
  imports: [CdcAuthModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
        cdc: {
          cmsComponents: ['GigyaRaasComponent'],
        },
      },
    }),
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
