import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthService,
  ConfigInitializerService,
  provideConfig,
} from '@spartacus/core';
import { AuthModule } from './auth/auth.module';
import { GigyaAuthService } from './auth/facade/gigya-auth.service';
import { GigyaUserTokenEffects } from './auth/store';
import { GigyaJsService } from './cms-components/gigya-js/gigya-js.service';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';
import { GigyaConfig } from './config/gigya-config';

export function gigyaJSFactory(
  gigyaJsService: GigyaJsService,
  configInit: ConfigInitializerService
) {
  const func = () =>
    configInit.getStableConfig('context').then(() => {
      gigyaJsService.initialize();
    });
  return func;
}

@NgModule({
  imports: [
    GigyaRaasModule,
    AuthModule,
    EffectsModule.forRoot([GigyaUserTokenEffects]),
  ],
  providers: [{ provide: AuthService, useClass: GigyaAuthService }],
})
export class GigyaModule {
  static forRoot(config: GigyaConfig): ModuleWithProviders<GigyaModule> {
    return {
      ngModule: GigyaModule,
      providers: [
        provideConfig(config),
        {
          provide: APP_INITIALIZER,
          useFactory: gigyaJSFactory,
          deps: [GigyaJsService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
