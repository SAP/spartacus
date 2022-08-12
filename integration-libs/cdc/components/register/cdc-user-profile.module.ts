import { NgModule } from '@angular/core';
import { CDCForgotPasswordModule } from './facade/cdc-forgot-password.module';
import { CDCRegisterModule } from './facade/cdc-register.module';

@NgModule({
  imports: [CDCRegisterModule, CDCForgotPasswordModule],
})
export class CDCUserProfileModule {}
