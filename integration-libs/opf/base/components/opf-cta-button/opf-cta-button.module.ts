/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpfCtaButtonComponent } from './opf-cta-button.component';

@NgModule({
  declarations: [OpfCtaButtonComponent],
  imports: [CommonModule],
  exports: [OpfCtaButtonComponent],
})
export class OpfCtaButtonModule {}
