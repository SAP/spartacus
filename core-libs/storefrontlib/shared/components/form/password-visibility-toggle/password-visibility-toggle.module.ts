/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { defaultFormConfig } from '../../../config/default-form-config';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';
import { PasswordVisibilityToggleDirective } from './password-visibility-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    I18nModule,
    PasswordVisibilityToggleDirective,
    PasswordVisibilityToggleComponent,
  ],
  providers: [provideDefaultConfig(defaultFormConfig)],
  exports: [
    PasswordVisibilityToggleDirective,
    PasswordVisibilityToggleComponent,
  ],
})
export class PasswordVisibilityToggleModule {}
