import { NgModule } from '@angular/core';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [LoginModule, LoginFormModule, LoginRegisterModule],
})
export class UserAccountComponentsModule {}
