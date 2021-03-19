import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializerService, provideConfig } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcConfig } from '../root/config/cdc-config';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcJsService } from './auth/facade/cdc-js.service';
import { CdcLogoutGuard } from './auth/guards/cdc-logout.guard';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';

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
  imports: [GigyaRaasModule, CdcAuthModule],
  providers: [{ provide: LogoutGuard, useExisting: CdcLogoutGuard }],
})
export class CdcModule {
  static forRoot(config: CdcConfig): ModuleWithProviders<CdcModule> {
    return {
      ngModule: CdcModule,
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
