import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { UserLoaderService } from '../data/user-loader.service';

import * as fromGuards from './guard';


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
