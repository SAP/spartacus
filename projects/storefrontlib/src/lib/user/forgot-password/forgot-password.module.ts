import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ConfigModule, CmsConfig, UrlTranslationModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ForgotPasswordComponent: { selector: 'cx-forgot-password' }
      }
    })
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent],
  entryComponents: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
