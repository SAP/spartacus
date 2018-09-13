import { NgModule } from '@angular/core';

import { UserModule } from '../../../user/user.module';
import { ResetPasswordLayoutComponent } from './reset-password-page-layout.component';

@NgModule({
  imports: [UserModule],
  declarations: [ResetPasswordLayoutComponent],
  exports: [ResetPasswordLayoutComponent]
})
export class ResetPasswordPageLayoutModule {}
