import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfigModule, CmsConfig } from '@spartacus/core';

import { ResetNewPasswordFormComponent } from './reset-new-password-form/reset-new-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ResetPasswordComponent: { selector: 'cx-reset-new-password-form' }
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ResetNewPasswordFormComponent],
  exports: [ResetNewPasswordFormComponent],
  entryComponents: [ResetNewPasswordFormComponent]
})
export class ResetNewPasswordModule {}
