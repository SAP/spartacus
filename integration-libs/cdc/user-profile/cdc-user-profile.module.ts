import { NgModule } from '@angular/core';
import { CDCForgotPasswordModule } from './forgot-password/cdc-forgot-password.module';
import { CDCRegisterModule } from './register/cdc-register.module';

@NgModule({
  imports: [CDCRegisterModule, CDCForgotPasswordModule],
})
export class CDCUserProfileModule {}
