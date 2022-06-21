import { NgModule } from '@angular/core';
import { LoginModule } from 'feature-libs/user/account/components/login';
import { LoginRegisterModule } from 'feature-libs/user/account/components/login-register';
import { CDCUserLoginModule } from '.';


@NgModule({
  imports: [LoginModule, CDCUserLoginModule, LoginRegisterModule], //replacing LoginFormModule
})
export class CDCUserAccountComponentsModule {}
