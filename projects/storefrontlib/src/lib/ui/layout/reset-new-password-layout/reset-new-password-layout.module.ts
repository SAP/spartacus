import { NgModule } from '@angular/core';

import { ResetNewPasswordModule } from '../../../user/reset-new-password/reset-new-password.module';
import { ResetNewPasswordLayoutComponent } from './reset-new-password-layout.component';

@NgModule({
  imports: [ResetNewPasswordModule],
  declarations: [ResetNewPasswordLayoutComponent],
  exports: [ResetNewPasswordLayoutComponent]
})
export class ResetNewPasswordLayoutModule {}
