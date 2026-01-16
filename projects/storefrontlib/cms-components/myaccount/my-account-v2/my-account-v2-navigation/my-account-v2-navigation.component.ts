/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationComponent } from '../../../navigation';
import { NavigationUIComponent } from '../../../navigation/navigation/navigation-ui.component';

@Component({
  selector: 'cx-my-account-v2-navigation',
  templateUrl: './my-account-v2-navigation.component.html',
  imports: [NgIf, NavigationUIComponent, NgClass, AsyncPipe],
})
export class MyAccountV2NavigationComponent extends NavigationComponent {}
