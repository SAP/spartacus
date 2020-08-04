import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthService,
  ConfigInitializerService,
  provideConfig,
} from '@spartacus/core';
import { CDCAuthModule } from './auth/cdc-auth.module';
import { CDCAuthService } from './auth/facade/cdc-auth.service';
import { CDCJsService } from './auth/facade/cdc-js.service';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';
import { CDCConfig } from './config/cdc-config';

export function cdcJSFactory(
  cdcJsService: CDCJsService,
  configInit: ConfigInitializerService
) {
  const func = () =>
    configInit.getStableConfig('context', 'cdc').then(() => {
      cdcJsService.initialize();
    });
  return func;
}

@NgModule({
  imports: [GigyaRaasModule, CDCAuthModule],
  providers: [{ provide: AuthService, useClass: CDCAuthService }],
})
export class CDCModule {
  static forRoot(config: CDCConfig): ModuleWithProviders<CDCModule> {
    return {
      ngModule: CDCModule,
      providers: [
        provideConfig(config),
        {
          provide: APP_INITIALIZER,
          useFactory: cdcJSFactory,
          deps: [CDCJsService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
