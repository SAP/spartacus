import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';
import { GigyaConfig } from './config/gigya-config';
import { provideConfig, Config, AuthService } from '@spartacus/core';
import { GigyaUserTokenEffects } from './auth/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { GigyaAuthService } from './auth/facade/gigya-auth.service';
import { GigyaJsService } from './cms-components/gigya-js/gigya-js.service';

export function gigyaJSFactory(gigyaJsService: GigyaJsService) {
  const func = () => gigyaJsService.initialize();
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
