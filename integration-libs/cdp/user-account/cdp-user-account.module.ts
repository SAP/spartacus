/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdpLoginModule } from './cdp-login';

@NgModule({
  declarations: [],
  imports: [CommonModule, CdpLoginModule],
})
export class CdpUserAccountModule {}
