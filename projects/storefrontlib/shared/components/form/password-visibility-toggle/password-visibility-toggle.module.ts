/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { FormConfig } from '../../../../shared/config/form-config';
import { defaultFormConfig } from '../../../../shared/config/default-form-config';
import { PasswordVisibilityToggleDirective } from './password-visibility-toggle.directive';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  providers: [provideDefaultConfig(<FormConfig>defaultFormConfig)],
  declarations: [
    PasswordVisibilityToggleDirective,
    PasswordVisibilityToggleComponent,
  ],
  exports: [
    PasswordVisibilityToggleDirective,
    PasswordVisibilityToggleComponent,
  ],
})
export class PasswordVisibilityToggleModule {}
