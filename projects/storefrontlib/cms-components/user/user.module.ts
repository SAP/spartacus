/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { LoginRouteModule } from './login-route/login-route.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
  imports: [
    LogoutModule,
    LoginRouteModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
})
export class UserComponentModule {}
