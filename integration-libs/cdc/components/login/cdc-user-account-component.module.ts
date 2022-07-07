import { NgModule } from '@angular/core';
import { LoginModule, LoginRegisterModule } from '@spartacus/user/account/components';
import { CDCUserLoginModule } from '.';


@NgModule({
  imports: [LoginModule, CDCUserLoginModule, LoginRegisterModule], //replacing LoginFormModule
})
export class CDCUserAccountComponentsModule {}
