import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { ChangePasswordFormModule } from '../change-password-form/change-password-form.module';
import { UserChangePasswordComponent } from './user-change-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SplitViewModule,
    IconModule,
    ChangePasswordFormModule,
    ReactiveFormsModule,
  ],
  declarations: [UserChangePasswordComponent],
  exports: [UserChangePasswordComponent],
})
export class UserChangePasswordModule {}
