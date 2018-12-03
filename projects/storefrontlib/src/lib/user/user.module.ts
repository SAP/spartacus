import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { UserService } from './facade/user.service';

import { metaReducers } from './store/reducers/index';
import { LoginModule } from './components/login/login.module';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UrlTranslatorModule, ProductConverterModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    RouterModule,
    UrlTranslatorModule,
    ProductConverterModule
  ],
  declarations: [RegisterComponent, ResetPasswordComponent],
  providers: [reducerProvider, UserService],
  exports: [RegisterComponent, ResetPasswordComponent]
})
export class UserModule {}
