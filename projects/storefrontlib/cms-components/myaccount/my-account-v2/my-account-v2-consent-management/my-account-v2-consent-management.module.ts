/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { IconModule } from '../../../misc/icon/icon.module';
import { ConsentManagementComponentService } from '../../consent-management';
import { MyAccountV2ConsentManagementFormComponent } from './components/consent-form/my-account-v2-consent-management-form.component';
import { MyAccountV2ConsentManagementComponent } from './components/my-account-v2-consent-management.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        IconModule,
        FeaturesConfigModule,
        MyAccountV2ConsentManagementComponent,
        MyAccountV2ConsentManagementFormComponent,
    ],
    providers: [ConsentManagementComponentService],
    exports: [
        MyAccountV2ConsentManagementComponent,
        MyAccountV2ConsentManagementFormComponent,
    ],
})
export class MyAccountV2ConsentManagementModule {}
