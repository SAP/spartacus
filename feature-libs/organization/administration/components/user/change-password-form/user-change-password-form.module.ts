import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule, KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../../shared/card/card.module';
import { UserChangePasswordFormComponent } from './user-change-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    CardModule,
    KeyboardFocusModule,
  ],
  declarations: [UserChangePasswordFormComponent],
})
export class UserChangePasswordFormModule {}
