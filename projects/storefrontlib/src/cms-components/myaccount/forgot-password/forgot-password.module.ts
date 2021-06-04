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
import { FormErrorsModule } from '../../../shared/index';
import { ForgotPasswordComponent } from './forgot-password.component';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
// TODO (#11607) remove Module
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
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
})
export class ForgotPasswordModule {}
