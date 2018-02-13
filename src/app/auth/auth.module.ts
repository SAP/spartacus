import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStatusModule } from './login/login.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from './store';
import { UserTokenService } from './service/user-token.service';

@NgModule({
  imports: [
    CommonModule,
    LoginStatusModule,
    StoreModule.forFeature('tokens', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [UserTokenService]
})
export class AuthModule {}
