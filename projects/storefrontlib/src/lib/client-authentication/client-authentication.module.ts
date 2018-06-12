import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationTokenInterceptor } from './http-interceptors/authentication-token.interceptor';
import { OccModule } from '../occ/occ.module';

@NgModule({
  imports: [
    OccModule,
    StoreModule.forFeature('client-authentication', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationTokenInterceptor,
      multi: true
    }
  ]
})
export class ClientAuthenticationModule {}
