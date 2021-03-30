import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
} from '@spartacus/core';
import { FormErrorsModule } from '../../../shared/index';
import { ResetPasswordFormComponent } from './reset-password-form.component';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    I18nModule,
    FormErrorsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ResetPasswordComponent: {
          component: ResetPasswordFormComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [ResetPasswordFormComponent],
  exports: [ResetPasswordFormComponent],
  entryComponents: [ResetPasswordFormComponent],
})
export class ResetPasswordModule {}
