import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { metaReducers } from './store/reducers';
import * as fromGuards from './guards';
import { LoginModule } from './components/login/login.module';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    StoreModule.forFeature('user', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [...fromGuards.guards]
})
export class UserModule {}
