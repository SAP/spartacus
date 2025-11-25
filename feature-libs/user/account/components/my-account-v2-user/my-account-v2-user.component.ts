/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { LoginComponent } from '../login';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-my-account-v2-user',
  templateUrl: './my-account-v2-user.component.html',
  imports: [NgIf, RouterLink, AsyncPipe, UrlPipe, TranslatePipe],
})
export class MyAccountV2UserComponent extends LoginComponent {}
