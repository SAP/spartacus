import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthService,
  ConfigInitializerService,
  provideConfig,
} from '@spartacus/core';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { CdcAuthService } from './auth/facade/cdc-auth.service';
import { CdcJsService } from './auth/facade/cdc-js.service';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';
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
  imports: [GigyaRaasModule, CdcAuthModule],
  providers: [{ provide: AuthService, useClass: CdcAuthService }],
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
