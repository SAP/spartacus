/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ConsentManagementComponent } from '../../../consent-management/components/consent-management.component';
import { MyAccountV2ConsentManagementFormComponent } from './consent-form/my-account-v2-consent-management-form.component';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-my-account-v2-consent-management',
    templateUrl: './my-account-v2-consent-management.component.html',
    standalone: true,
    imports: [
        NgIf,
        SpinnerComponent,
        FeaturesConfigModule,
        NgFor,
        MyAccountV2ConsentManagementFormComponent,
        AsyncPipe,
        I18nModule,
    ],
})
export class MyAccountV2ConsentManagementComponent extends ConsentManagementComponent {}
