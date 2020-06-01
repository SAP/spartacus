import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthService,
  Config,
  provideConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { AuthModule } from './auth/auth.module';
import { GigyaAuthService } from './auth/facade/gigya-auth.service';
import { GigyaUserTokenEffects } from './auth/store';
import { GigyaJsModule } from './cms-components/gigya-js/gigya-js.module';
import { GigyaJsService } from './cms-components/gigya-js/gigya-js.service';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';
import { DEFAULT_GIGYA_CONFIG } from './config/default-gigya-config';
import { GigyaConfig } from './config/gigya-config';
import { GigyaMainModule } from './layout/gigya.main.module';

export function gigyaJSFactory(gigyaJsService: GigyaJsService) {
  const func = () => gigyaJsService.initialize();
  return func;
}

@NgModule({
  imports: [
    GigyaRaasModule,
    GigyaJsModule,
    GigyaMainModule,
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
        provideDefaultConfig(DEFAULT_GIGYA_CONFIG),
        provideConfig(config),
        { provide: GigyaConfig, useExisting: Config },
        {
          provide: APP_INITIALIZER,
          useFactory: gigyaJSFactory,
          deps: [GigyaJsService],
          multi: true,
        },
      ],
    };
  }
}
