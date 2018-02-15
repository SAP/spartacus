import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { OccUserService } from '../newocc/user/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserTokenInterceptor } from './http-interceptors/user-token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    OccUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserTokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
