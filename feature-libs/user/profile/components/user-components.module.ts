import { NgModule } from '@angular/core';
import { ForgotPasswordModule } from './forgot-password';
import { RegisterComponentModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password';
import { UpdateEmailModule } from './update-email/update-email.module';
import { UpdateProfileModule } from './update-profile';

@NgModule({
  imports: [
    UpdateProfileModule,
    UpdateEmailModule,
    RegisterComponentModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
})
export class UserComponentsModule {}
