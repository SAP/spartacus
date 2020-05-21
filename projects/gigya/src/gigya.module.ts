import { NgModule, ModuleWithProviders } from '@angular/core';
import { GigyaMainModule } from './layout/gigya.main.module';
import { GigyaRaasModule } from './cms-components/gigya-raas/gigya-raas.module';
import { GigyaJsModule } from './cms-components/gigya-js/gigya-js.module';
import { GigyaConfig } from './config/gigya-config';
import { provideConfig, Config, AuthService, provideDefaultConfig } from '@spartacus/core';
import { DEFAULT_GIGYA_CONFIG } from './config/default-gigya-config';
import { GigyaUserTokenEffects } from './auth/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { GigyaAuthService } from './auth/facade/gigya-auth.service';

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
      ],
    };
  }
}
