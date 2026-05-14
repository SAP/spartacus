/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { NotificationPreferenceComponent } from '../../notification-preference/notification-preference.component';

@Component({
  selector: 'cx-my-account-v2-notification-preference',
  templateUrl: './my-account-v2-notification-preference.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, SpinnerComponent, AsyncPipe, TranslatePipe],
})
export class MyAccountV2NotificationPreferenceComponent extends NotificationPreferenceComponent {}
