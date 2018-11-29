import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfigModule, Config, RoutingModule } from '@spartacus/core';
import {
  AuthModuleConfig,
  defaultAuthModuleConfig
} from './auth-module.config';
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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RoutingModule,
    StoreModule.forFeature('auth', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(defaultAuthModuleConfig)
  ],
  providers: [
    ...guards,
    ...services,
    ...interceptors,
    reducerProvider,
    { provide: AuthModuleConfig, useExisting: Config }
  ]
})
export class AuthModule {}
