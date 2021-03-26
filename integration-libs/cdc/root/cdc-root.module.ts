import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializerService, provideConfig } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcJsService } from './auth/facade/cdc-js.service';
import { CdcLogoutGuard } from './auth/guards/cdc-logout.guard';
import { CdcConfig } from './config/cdc-config';

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
  providers: [{ provide: LogoutGuard, useExisting: CdcLogoutGuard }],
})
export class CdcRootModule {
  static forRoot(config: CdcConfig): ModuleWithProviders<CdcRootModule> {
    return {
      ngModule: CdcRootModule,
      providers: [
        provideConfig(config),
        {
          provide: APP_INITIALIZER,
          useFactory: cdcJsFactory,
          deps: [CdcJsService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
