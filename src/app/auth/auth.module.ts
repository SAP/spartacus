import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserLoaderService } from '../data/user-loader.service';
import { LoginModule } from './login/login.module';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [
    UserLoaderService,
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
export class AuthModule { }
