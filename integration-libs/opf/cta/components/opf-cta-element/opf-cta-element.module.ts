/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpfCtaElementComponent } from './opf-cta-element.component';

@NgModule({
  imports: [CommonModule, OpfCtaElementComponent],
  exports: [OpfCtaElementComponent],
})
export class OpfCtaElementModule {}
