import { NgModule } from '@angular/core';

import { UserComponentModule } from '../../../user/user.module';
import { ResetPasswordLayoutComponent } from './reset-password-page-layout.component';

@NgModule({
  imports: [UserComponentModule],
  declarations: [ResetPasswordLayoutComponent],
  exports: [ResetPasswordLayoutComponent]
})
export class ResetPasswordPageLayoutModule {}
