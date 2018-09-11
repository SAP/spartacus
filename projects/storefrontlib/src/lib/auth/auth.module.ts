import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthModuleConfig } from './auth-module.config';
import { services } from './services/index';

import { guards } from './guards/index';

import { interceptors } from './http-interceptors/index';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './store/effects/index';
import {
  reducerToken,
  reducerProvider,
  metaReducers
} from './store/reducers/index';

export function overrideAuthModuleConfig(configOverride: any) {
  return { ...new AuthModuleConfig(), ...configOverride };
}

export const AUTH_MODULE_CONFIG_OVERRIDE: InjectionToken<
  string
> = new InjectionToken<string>('AUTH_MODULE_CONFIG_OVERRIDE');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('auth', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...guards,
    ...services,
    ...interceptors,
    reducerProvider,
    AuthModuleConfig
  ]
})
export class AuthModule {
  static forRoot(configOverride?: any): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_MODULE_CONFIG_OVERRIDE,
          useValue: configOverride
        },
        {
          provide: AuthModuleConfig,
          useFactory: overrideAuthModuleConfig,
          deps: [AUTH_MODULE_CONFIG_OVERRIDE]
        }
      ]
    };
  }
}
