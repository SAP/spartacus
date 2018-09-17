import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { defaultAuthModuleConfig } from './auth-module.config';
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
import { ConfigModule } from '../config/config.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('auth', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig( defaultAuthModuleConfig )
  ],
  providers: [
    ...guards,
    ...services,
    ...interceptors,
    reducerProvider
  ]
})
export class AuthModule {}
