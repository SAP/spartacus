import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { metaReducers } from './store/reducers';
import * as fromGuards from './guards';
import { LoginModule } from './login/login.module';
import { effects, reducers } from './store';
import { OccUserService } from '../newocc/user/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserTokenInterceptor } from './http-interceptors/user-token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    StoreModule.forFeature('user', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    ...fromGuards.guards,
    OccUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserTokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
