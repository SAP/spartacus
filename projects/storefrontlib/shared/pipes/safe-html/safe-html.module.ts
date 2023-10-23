/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [SafeHtmlPipe],
  exports: [SafeHtmlPipe],
})
export class SafeHtmlModule {}
