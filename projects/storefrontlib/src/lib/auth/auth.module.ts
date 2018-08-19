import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';

import { services } from './services/index';
import { guards } from './guards/index';
import { interceptors } from './http-interceptors/index';

import { StoreModule } from '@ngrx/store';
import { effects } from './store/effects/index';
import {
  reducerToken,
  reducerProvider,
  metaReducers
} from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('auth', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [...guards, ...services, ...interceptors, reducerProvider]
})
export class AuthModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
