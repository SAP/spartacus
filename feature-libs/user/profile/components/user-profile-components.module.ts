import { NgModule } from '@angular/core';
import { CloseAccountModule } from './close-account/close-account.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RegisterComponentModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UpdateEmailModule } from './update-email/update-email.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { UpdateProfileModule } from './update-profile/update-profile.module';

@NgModule({
  imports: [
    RegisterComponentModule,
    UpdateProfileModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    CloseAccountModule,
  ],
})
export class UserProfileComponentsModule {}
