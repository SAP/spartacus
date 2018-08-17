import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ClientTokenInterceptor } from './http-interceptors/client-token.interceptor';
import { UserHttpInterceptor } from './http-interceptors/user-http.interceptor';
import { AuthErrorInterceptor } from './http-interceptors/auth-error.interceptor';
import { services } from './services/index';
import { guards } from './guards/index';

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
  providers: [
    ...guards,
    ...services,
    reducerProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true
    }
  ]
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
