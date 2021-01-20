import { NgModule } from '@angular/core';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    LoginModule,
    // LoginFormModule,
    LoginRegisterModule,
  ],
})
export class UserDetailsComponentsModule {}
