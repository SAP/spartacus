import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { metaReducers } from './store/reducers/index';
import { LoginModule } from './components/login/login.module';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('user', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [RegisterComponent],
  providers: [reducerProvider],
  exports: [RegisterComponent]
})
export class UserModule {}
