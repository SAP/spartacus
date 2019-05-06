import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UrlTranslationModule, UserModule } from '@spartacus/core';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginModule } from './login/login.module';
import { RegisterComponentModule } from './register/register.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    LoginFormModule,
    ReactiveFormsModule,
    RouterModule,
    UserModule,
    UrlTranslationModule,
    RegisterComponentModule,
  ],
})
export class UserComponentModule {}
