import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromGuards from './guards';
import { LoginModule } from './login/login.module';
import { effects, reducers } from './store';
import { OccUserService } from '../newocc/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    ...fromGuards.guards,
    OccUserService
    // providers: [
    //   ConfigService,
    //   // {
    //   //   provide: HTTP_INTERCEPTORS,
    //   //   useClass: [Name of the Interceptor],
    //   //   multi: true
    //   // }
    // ]
  ]
})
export class AuthModule {}
