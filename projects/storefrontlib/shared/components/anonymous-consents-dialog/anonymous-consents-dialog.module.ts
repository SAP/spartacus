/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { ConsentManagementModule } from '../../../cms-components/myaccount/consent-management/consent-management.module';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/index';

import { AnonymousConsentDialogComponent } from './anonymous-consent-dialog.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    IconModule,
    ConsentManagementModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
    AnonymousConsentDialogComponent,
],
    exports: [AnonymousConsentDialogComponent],
})
export class AnonymousConsentsDialogModule {}
