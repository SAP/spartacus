import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ForgotPasswordComponent: {
          component: ForgotPasswordComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent],
  entryComponents: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
