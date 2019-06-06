import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  NotAuthGuard,
  UrlModule,
} from '@spartacus/core';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ForgotPasswordComponent: {
          component: ForgotPasswordComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
    I18nModule,
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent],
  entryComponents: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
