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
import { FormErrorsModule } from '@spartacus/storefront';
import { ResetPasswordFormComponent } from './reset-password-form.component';

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
})
export class ResetPasswordModule {}
