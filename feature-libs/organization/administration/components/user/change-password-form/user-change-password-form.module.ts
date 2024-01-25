/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  FormErrorsModule,
  KeyboardFocusModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
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
    PasswordVisibilityToggleModule,
  ],
  declarations: [UserChangePasswordFormComponent],
})
export class UserChangePasswordFormModule {}
