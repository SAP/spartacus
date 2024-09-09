/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationPreferenceComponent } from '../../notification-preference/notification-preference.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-my-account-v2-notification-preference',
    templateUrl: './my-account-v2-notification-preference.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        FeaturesConfigModule,
        NgFor,
        SpinnerComponent,
        AsyncPipe,
        I18nModule,
    ],
})
export class MyAccountV2NotificationPreferenceComponent extends NotificationPreferenceComponent {}
