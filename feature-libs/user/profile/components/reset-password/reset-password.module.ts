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
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ResetPasswordComponent: {
          component: ResetPasswordComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
