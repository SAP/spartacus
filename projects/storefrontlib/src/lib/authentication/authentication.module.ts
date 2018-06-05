import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationTokenInterceptor } from './http-interceptors/authentication-token.interceptor';
import { TrustedClientTokenService } from './services/trusted-client-token.service';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    TrustedClientTokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationTokenInterceptor,
      multi: true
    }
  ]
})
export class AuthenticationModule {}
