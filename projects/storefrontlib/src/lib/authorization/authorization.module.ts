import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthorizationTokenInterceptor } from './http-interceptors/authorization-token.interceptor';
import { OccModule } from '../occ/occ.module';

@NgModule({
  imports: [
    OccModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationTokenInterceptor,
      multi: true
    }
  ]
})
export class AuthorizationModule {}
